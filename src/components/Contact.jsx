import { Linkedin, Mail, MapPin, Phone } from "lucide-react";
import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Please <span className="text-primary">Contact Me</span>
        </h2>
        <p className="text-muted-foreground mb-12">
          I’d love to connect with you! Feel free to reach out through email,
          phone, or LinkedIn.
        </p>

        <div className="space-y-6 text-left md:text-center">
          <div className="flex items-center justify-center space-x-4">
            <Mail className="h-6 w-6 text-primary" />
            <a
              href="mailto:waywayataclibon.wt@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              waywayataclibon.wt@gmail.com
            </a>
          </div>

          <div className="flex items-center justify-center space-x-4">
            <Phone className="h-6 w-6 text-primary" />
            <a
              href="tel:09984952000"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              09984952000
            </a>
          </div>

          <div className="flex items-center justify-center space-x-4">
            <MapPin className="h-6 w-6 text-primary" />
            <span className="text-muted-foreground">
              West Rembo, Taguig City, Philippines
            </span>
          </div>

          <div className="flex items-center justify-center space-x-4 pt-6">
            <a
              href="https://www.linkedin.com/in/waywaya-taclibon-443432312/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
