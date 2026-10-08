import { useEffect, useRef, useState } from "react";
import { motion as Motion } from "framer-motion";
import {
  Check,
  Copy,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const EMAIL = "waywayataclibon.wt@gmail.com";
const PHONE = "09984952000";

const copyText = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for non-secure contexts: hidden textarea + execCommand
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      return true;
    } catch {
      return false;
    }
  }
};

const CopyButton = ({ value, id, copiedId, onCopied, label }) => {
  const isCopied = copiedId === id;
  return (
    <button
      type="button"
      onClick={async () => {
        if (await copyText(value)) onCopied(id);
      }}
      aria-label={`Copy ${label} to clipboard`}
      className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors duration-300 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-sm"
    >
      {isCopied ? (
        <Check className="h-3.5 w-3.5 text-primary" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
      {isCopied ? "Copied" : "Copy"}
    </button>
  );
};

const Contact = () => {
  const [copiedId, setCopiedId] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopied = (id) => {
    setCopiedId(id);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 relative overflow-hidden bg-secondary/30">
      <Motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="container mx-auto max-w-5xl text-center relative z-10"
      >
        <Motion.h2
          variants={item}
          className="text-3xl md:text-4xl font-extrabold tracking-tight text-balance mb-4"
        >
          Get In <span className="text-gradient">Touch</span>
        </Motion.h2>
        <Motion.p
          variants={item}
          className="text-muted-foreground mb-12 text-balance"
        >
          I&apos;d love to connect with you! Feel free to reach out through
          email, phone, or LinkedIn.
        </Motion.p>

        <div aria-live="polite" className="sr-only">
          {copiedId === "email" && "Email address copied to clipboard"}
          {copiedId === "phone" && "Phone number copied to clipboard"}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-left">
          <Motion.div
            variants={item}
            className="rounded-2xl border border-border bg-card/60 backdrop-blur p-6 shadow-sm transition-all duration-300 hover:border-primary/40 hover:-translate-y-1"
          >
            <div className="p-3 rounded-full bg-primary/10 w-fit mb-4">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <p className="text-sm font-semibold text-foreground mb-1">Email</p>
            <a
              href={`mailto:${EMAIL}`}
              className="block text-sm text-muted-foreground break-all transition-colors hover:text-primary mb-3"
            >
              {EMAIL}
            </a>
            <CopyButton
              value={EMAIL}
              id="email"
              copiedId={copiedId}
              onCopied={handleCopied}
              label="email address"
            />
          </Motion.div>

          <Motion.div
            variants={item}
            className="rounded-2xl border border-border bg-card/60 backdrop-blur p-6 shadow-sm transition-all duration-300 hover:border-primary/40 hover:-translate-y-1"
          >
            <div className="p-3 rounded-full bg-primary/10 w-fit mb-4">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <p className="text-sm font-semibold text-foreground mb-1">Phone</p>
            <a
              href={`tel:${PHONE}`}
              className="block text-sm text-muted-foreground transition-colors hover:text-primary mb-3"
            >
              {PHONE}
            </a>
            <CopyButton
              value={PHONE}
              id="phone"
              copiedId={copiedId}
              onCopied={handleCopied}
              label="phone number"
            />
          </Motion.div>

          <Motion.div
            variants={item}
            className="rounded-2xl border border-border bg-card/60 backdrop-blur p-6 shadow-sm transition-all duration-300 hover:border-primary/40 hover:-translate-y-1"
          >
            <div className="p-3 rounded-full bg-primary/10 w-fit mb-4">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <p className="text-sm font-semibold text-foreground mb-1">
              Location
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              West Rembo, Taguig City, Philippines
            </p>
          </Motion.div>
        </div>

        <Motion.div variants={item}>
          <a
            href={`mailto:${EMAIL}`}
            className="cosmic-button group inline-flex items-center gap-2 px-8 py-3 text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <Mail className="h-4 w-4" />
            Send Me an Email
          </a>
        </Motion.div>

        <Motion.div
          variants={item}
          className="flex items-center justify-center gap-3 pt-8"
        >
          <a
            href="https://github.com/Waywaya-Taclibon"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 backdrop-blur text-muted-foreground transition-all duration-300 hover:text-primary hover:border-primary/50 hover:-translate-y-0.5"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/waywaya-taclibon-443432312/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 backdrop-blur text-muted-foreground transition-all duration-300 hover:text-primary hover:border-primary/50 hover:-translate-y-0.5"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href={`mailto:${EMAIL}`}
            aria-label="Send email"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 backdrop-blur text-muted-foreground transition-all duration-300 hover:text-primary hover:border-primary/50 hover:-translate-y-0.5"
          >
            <Mail className="h-5 w-5" />
          </a>
        </Motion.div>
      </Motion.div>
    </section>
  );
};

export default Contact;
