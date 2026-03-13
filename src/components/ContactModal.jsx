import { motion, AnimatePresence } from "framer-motion";
import { useContext } from "react";
import { LangContext } from "../providers/LangContext";
import MoreButton from "../components/MoreButton";
import {
  MessagesSquare,
  X,
  ChevronDown,
  Loader2,
  CheckCircle,
  MailCheck,
  AlertCircle,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import PropTypes from "prop-types";

const ContactModal = ({ isOpen, onClose }) => {
  const { t } = useContext(LangContext);
  const formRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [sentEmails, setSentEmails] = useState(() => {
    const stored = localStorage.getItem("contactFormSentEmails");
    return stored ? JSON.parse(stored) : [];
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [validationErrors, setValidationErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const EMAILJS_CONFIG = {
    SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    AUTOREPLY_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID,
    PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  };

  // Subject options from translations
  const subjects = [
    t?.contact?.modal?.subjects?.project || "Project Inquiry",
    t?.contact?.modal?.subjects?.collaboration || "Collaboration",
    t?.contact?.modal?.subjects?.sayHi || "Saying Hi!",
    t?.contact?.modal?.subjects?.hiring || "Hiring or Recruitment",
  ];

  useEffect(() => {
    localStorage.setItem("contactFormSentEmails", JSON.stringify(sentEmails));
  }, [sentEmails]);

  useEffect(() => {
    if (!isOpen) {
      setIsSubmitDisabled(false);
      setHoneypot("");
      setIsSuccess(false);
      setValidationErrors({
        name: "",
        email: "",
        message: "",
      });
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.trimStart(),
    }));

    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubjectSelect = (subject) => {
    setFormData((prev) => ({
      ...prev,
      subject,
    }));
    setIsDropdownOpen(false);
  };

  const trimFormData = (data) => {
    return Object.keys(data).reduce((acc, key) => {
      acc[key] = typeof data[key] === "string" ? data[key].trim() : data[key];
      return acc;
    }, {});
  };

  const validateForm = () => {
    const trimmedData = trimFormData(formData);
    const errors = {
      name: "",
      email: "",
      message: "",
    };
    let isValid = true;

    if (!trimmedData.name) {
      errors.name =
        t?.contact?.modal?.validation?.nameRequired || "Name is required";
      isValid = false;
    }

    if (!trimmedData.email) {
      errors.email =
        t?.contact?.modal?.validation?.emailRequired || "Email is required";
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedData.email)) {
        errors.email =
          t?.contact?.modal?.validation?.emailInvalid ||
          "Please enter a valid email address";
        isValid = false;
      }
    }

    if (!trimmedData.message) {
      errors.message =
        t?.contact?.modal?.validation?.messageRequired || "Message is required";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting || isSubmitDisabled) {
      return;
    }

    if (honeypot.trim() !== "") {
      console.log("Spam detected via honeypot");

      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setHoneypot("");

      setTimeout(() => {
        onClose();
        setIsSuccess(false);
      }, 3000);
      return;
    }

    if (!validateForm()) {
      const firstErrorField = Object.keys(validationErrors).find(
        (key) => validationErrors[key],
      );
      if (firstErrorField) {
        const element = document.querySelector(`[name="${firstErrorField}"]`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          element.focus();
        }
      }
      return;
    }

    setIsSubmitting(true);
    setIsSubmitDisabled(true);

    try {
      const now = new Date();
      const formattedDate = now.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          from_name: formData.name.trim(),
          from_email: formData.email.trim(),
          subject:
            formData.subject ||
            t?.contact?.modal?.subjects?.project ||
            "Project Inquiry",
          message: formData.message.trim(),
          to_name: "Your Name",
          reply_to: formData.email.trim(),
          date: formattedDate,
          time: formattedTime,
          year: now.getFullYear().toString(),
          timestamp: now.toISOString(),
        },
        EMAILJS_CONFIG.PUBLIC_KEY,
      );

      console.log("Email sent successfully");

      const emailKey = formData.email.trim().toLowerCase();
      const shouldSendAutoReply = !sentEmails.includes(emailKey);

      if (shouldSendAutoReply && EMAILJS_CONFIG.AUTOREPLY_TEMPLATE_ID) {
        try {
          await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.AUTOREPLY_TEMPLATE_ID,
            {
              from_name: formData.name.trim(),
              from_email: formData.email.trim(),
              subject:
                formData.subject ||
                t?.contact?.modal?.subjects?.project ||
                "Project Inquiry",
              year: now.getFullYear().toString(),
            },
            EMAILJS_CONFIG.PUBLIC_KEY,
          );

          console.log("Auto-reply sent");

          setSentEmails((prev) => [...prev, emailKey]);
        } catch (autoReplyError) {
          console.warn("Failed to send auto-reply:", autoReplyError);
        }
      } else if (!shouldSendAutoReply) {
        console.log("Auto-reply already sent to this email, skipping");
      }

      setIsSuccess(true);

      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setValidationErrors({
          name: "",
          email: "",
          message: "",
        });
        setHoneypot("");
        setIsSubmitDisabled(false);
        setIsSubmitting(false);
      }, 1000);

      setTimeout(() => {
        onClose();
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to send email:", error);

      const errorMessage =
        t?.contact?.modal?.errors?.submitFailed ||
        "Failed to send message. Please try again.";
      setValidationErrors((prev) => ({
        ...prev,
        _submit: errorMessage,
      }));

      setTimeout(() => {
        setValidationErrors((prev) => ({ ...prev, _submit: "" }));
        setIsSubmitDisabled(false);
        setIsSubmitting(false);
      }, 3000);
    }
  };

  const handleClose = () => {
    if (isSubmitting) return;

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setValidationErrors({
      name: "",
      email: "",
      message: "",
    });
    setHoneypot("");
    setIsSuccess(false);
    setIsSubmitting(false);
    setIsSubmitDisabled(false);
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !isSubmitting) {
      handleClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative w-full max-w-md rounded-2xl bg-white dark:bg-gray-900 p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 text-blue-600 hover:rotate-90 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting && !isSuccess}
            >
              <X size={20} />
            </button>

            {/* HEADER */}
            <div className="flex items-start gap-3 mb-6">
              <div className="text-blue-600">
                {isSuccess ? (
                  <MailCheck size={30} />
                ) : (
                  <MessagesSquare size={30} />
                )}
              </div>
              <div>
                <h3 className="font-bebas font-bold text-xl leading-tight">
                  {isSuccess
                    ? t?.contact?.modal?.successTitle || "MESSAGE SENT!"
                    : t?.contact?.modal?.title || "LET'S MAKE IT HAPPEN!"}
                </h3>
                <p className="font-poppins text-sm leading-tight opacity-70">
                  {isSuccess
                    ? t?.contact?.modal?.successSubtitle ||
                      "Thank you for reaching out!"
                    : t?.contact?.modal?.subtitle ||
                      "Let's Build Something Great Together!"}
                </p>
              </div>
            </div>

            {/* FORM OR SUCCESS MESSAGE */}
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 0.1,
                    }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4"
                  >
                    <CheckCircle
                      size={32}
                      className="text-green-600 dark:text-green-400"
                    />
                  </motion.div>

                  <motion.h4
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="font-bebas text-2xl mb-2"
                  >
                    {t?.contact?.modal?.successMessage || "ALL SET!"}
                  </motion.h4>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-600 dark:text-gray-300"
                  >
                    {t?.contact?.modal?.successDescription ||
                      "Got it! I'll get back to you soon."}
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="font-medium mt-4 text-blue-600 dark:text-blue-400"
                  >
                    {t?.contact?.modal?.successSignature || "– Haris"}
                  </motion.p>
                </motion.div>
              ) : isSubmitting ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="text-center py-12"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4"
                  >
                    <Loader2
                      size={32}
                      className="text-blue-600 dark:text-blue-400"
                    />
                  </motion.div>

                  <motion.h4
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="font-bebas text-2xl mb-2"
                  >
                    {t?.contact?.modal?.loadingTitle || "SENDING..."}
                  </motion.h4>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-600 dark:text-gray-300"
                  >
                    {t?.contact?.modal?.loadingDescription ||
                      "Delivering your message"}
                  </motion.p>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    {/* HONEYPOT FIELD */}
                    <div
                      className="absolute opacity-0 h-0 overflow-hidden"
                      aria-hidden="true"
                    >
                      <label htmlFor="website">
                        {t?.contact?.modal?.honeypot?.label || "Website"}
                      </label>
                      <input
                        type="text"
                        id="website"
                        name="website"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        tabIndex="-1"
                        autoComplete="off"
                        className="w-0 h-0"
                        placeholder={
                          t?.contact?.modal?.honeypot?.placeholder ||
                          "Leave this field blank"
                        }
                      />
                    </div>

                    {/* NAME */}
                    <div>
                      <label className="text-xs font-medium opacity-70">
                        {t?.contact?.modal?.labels?.name || "Name"}{" "}
                        <span className="text-red-500">
                          {t?.contact?.modal?.labels?.required || "*"}
                        </span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onBlur={(e) => {
                          const value = e.target.value.trim();
                          setFormData((prev) => ({
                            ...prev,
                            name: value,
                          }));
                          if (!value) {
                            setValidationErrors((prev) => ({
                              ...prev,
                              name:
                                t?.contact?.modal?.validation?.nameRequired ||
                                "Name is required",
                            }));
                          }
                        }}
                        placeholder={
                          t?.contact?.modal?.placeholders?.name ||
                          "Enter your name"
                        }
                        className={`mt-1 w-full rounded-md px-4 py-3 text-sm outline-none placeholder:text-gray-500 dark:placeholder:text-gray-400 ${
                          validationErrors.name
                            ? "bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 focus:ring-2 focus:ring-red-500"
                            : "bg-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-blue-600"
                        }`}
                      />
                      {validationErrors.name && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 flex items-center gap-1 text-red-600 dark:text-red-400 text-xs"
                        >
                          <AlertCircle size={12} />
                          <span>{validationErrors.name}</span>
                        </motion.div>
                      )}
                    </div>

                    {/* EMAIL */}
                    <div>
                      <label className="text-xs font-medium opacity-70">
                        {t?.contact?.modal?.labels?.email || "Email"}{" "}
                        <span className="text-red-500">
                          {t?.contact?.modal?.labels?.required || "*"}
                        </span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={(e) => {
                          const value = e.target.value.trim();
                          setFormData((prev) => ({
                            ...prev,
                            email: value,
                          }));

                          if (!value) {
                            setValidationErrors((prev) => ({
                              ...prev,
                              email:
                                t?.contact?.modal?.validation?.emailRequired ||
                                "Email is required",
                            }));
                          } else {
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            if (!emailRegex.test(value)) {
                              setValidationErrors((prev) => ({
                                ...prev,
                                email:
                                  t?.contact?.modal?.validation?.emailInvalid ||
                                  "Please enter a valid email address",
                              }));
                            }
                          }
                        }}
                        placeholder={
                          t?.contact?.modal?.placeholders?.email ||
                          "Enter your email address"
                        }
                        className={`mt-1 w-full rounded-md px-4 py-3 text-sm outline-none placeholder:text-gray-500 dark:placeholder:text-gray-400 ${
                          validationErrors.email
                            ? "bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 focus:ring-2 focus:ring-red-500"
                            : "bg-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-blue-600"
                        }`}
                      />
                      {validationErrors.email && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 flex items-center gap-1 text-red-600 dark:text-red-400 text-xs"
                        >
                          <AlertCircle size={12} />
                          <span>{validationErrors.email}</span>
                        </motion.div>
                      )}
                    </div>

                    {/* SUBJECT - Custom Dropdown */}
                    <div className="relative">
                      <label className="text-xs font-medium opacity-70">
                        {t?.contact?.modal?.labels?.subject || "Subject"}
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="mt-1 w-full rounded-md bg-gray-100 dark:bg-gray-800 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-600 flex items-center justify-between text-left"
                        >
                          <span
                            className={
                              formData.subject
                                ? ""
                                : "text-gray-500 dark:text-gray-400"
                            }
                          >
                            {formData.subject ||
                              t?.contact?.modal?.placeholders?.subject ||
                              "Select a subject"}
                          </span>
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-300 ${
                              isDropdownOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {/* Dropdown Menu */}
                        <AnimatePresence>
                          {isDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute z-10 w-full mt-1 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg"
                            >
                              {subjects.map((subject) => (
                                <button
                                  key={subject}
                                  type="button"
                                  onClick={() => handleSubjectSelect(subject)}
                                  className="w-full px-4 py-3 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-md last:rounded-b-md transition-colors"
                                >
                                  {subject}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* MESSAGE */}
                    <div>
                      <label className="text-xs font-medium opacity-70">
                        {t?.contact?.modal?.labels?.message ||
                          "What do you need help with?"}{" "}
                        <span className="text-red-500">
                          {t?.contact?.modal?.labels?.required || "*"}
                        </span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        onBlur={(e) => {
                          const value = e.target.value.trim();
                          setFormData((prev) => ({
                            ...prev,
                            message: value,
                          }));
                          if (!value) {
                            setValidationErrors((prev) => ({
                              ...prev,
                              message:
                                t?.contact?.modal?.validation
                                  ?.messageRequired || "Message is required",
                            }));
                          }
                        }}
                        rows="4"
                        placeholder={
                          t?.contact?.modal?.placeholders?.message ||
                          "Describe your project or idea..."
                        }
                        className={`mt-1 w-full rounded-md px-4 py-3 text-sm outline-none resize-none placeholder:text-gray-500 dark:placeholder:text-gray-400 ${
                          validationErrors.message
                            ? "bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 focus:ring-2 focus:ring-red-500"
                            : "bg-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-blue-600"
                        }`}
                      />
                      {validationErrors.message && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 flex items-center gap-1 text-red-600 dark:text-red-400 text-xs"
                        >
                          <AlertCircle size={12} />
                          <span>{validationErrors.message}</span>
                        </motion.div>
                      )}
                    </div>

                    {/* Submit error message */}
                    {validationErrors._submit && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg"
                      >
                        <div className="flex items-center gap-2 text-red-700 dark:text-red-300 text-sm">
                          <AlertCircle size={16} />
                          <span>{validationErrors._submit}</span>
                        </div>
                      </motion.div>
                    )}

                    {/* SUBMIT - Centered */}
                    <div className="flex justify-center pt-2">
                      <MoreButton
                        label={t?.common?.submitButton || "Send Message"}
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                      />
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

ContactModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ContactModal;
