import { motion as Motion } from "framer-motion";
import { Award, CalendarDays, ExternalLink } from "lucide-react";

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

const certifications = [
  {
    id: 1,
    title:
      "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    issuer: "Oracle",
    date: "October 2025",
    image: "/Certimg/OCI.png",
    verifyUrl: "/Certimg/eCertificate.pdf",
    badgeUrl:
      "https://catalog-education.oracle.com/ords/certview/sharebadge?id=59D47EC2B3E6D5066CADA95814C3D71CC308724E9381C9DABC9F249DE53EE6B5",
  },
  {
    id: 2,
    title:
      "Oracle Cloud Infrastructure 2025 Certified Foundations Associate",
    issuer: "Oracle",
    date: "October 2025",
    image: "/Certimg/OCI2.png",
    verifyUrl: "/Certimg/eCertificate2.pdf",
    badgeUrl:
      "https://catalog-education.oracle.com/pls/certview/sharebadge?id=D55293D169A0C65871053108BE29F676B734953A7E19022C3C5B043ABA3B9585",
  },
];

const Certifications = () => {
  return (
    <section id="certifications" className="py-24 px-4 sm:px-6 relative overflow-hidden">
      <Motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="container mx-auto max-w-5xl relative z-10"
      >
        {/* Section Title */}
        <Motion.h2
          variants={item}
          className="text-3xl md:text-4xl font-extrabold tracking-tight text-balance text-center mb-4"
        >
          My <span className="text-gradient">Certifications</span>
        </Motion.h2>

        <Motion.p
          variants={item}
          className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto text-balance"
        >
          A showcase of the certifications that reflect my continuous growth and
          pursuit of technical excellence.
        </Motion.p>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certifications.map((cert) => (
            <Motion.article
              key={cert.id}
              variants={item}
              className="group rounded-2xl border border-border bg-card/60 backdrop-blur overflow-hidden shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md hover:-translate-y-1"
            >
              {/* Image — aspect ratio matches the original 3-column h-48 crop (~14/9), so the tailored certificate previews look exactly as before, just larger */}
              <div className="relative aspect-[14/9] overflow-hidden">
                <img
                  src={cert.image}
                  alt={`${cert.title} certificate preview`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-card/90 backdrop-blur px-3 py-1 text-xs font-medium text-muted-foreground">
                  <Award className="h-3.5 w-3.5 text-primary" />
                  {cert.issuer}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold tracking-tight text-foreground text-balance mb-2">
                  {cert.title}
                </h3>
                <p className="flex items-center gap-1.5 text-muted-foreground text-xs mb-4">
                  <CalendarDays className="h-3.5 w-3.5 text-primary" />
                  {cert.date}
                </p>

                {/* Links */}
                <div className="flex items-center gap-3 flex-wrap">
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View certificate document for ${cert.title}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors duration-300 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-sm"
                  >
                    View Certificate <ExternalLink className="h-4 w-4" />
                  </a>

                  <span aria-hidden="true" className="text-muted-foreground">
                    |
                  </span>

                  <a
                    href={cert.badgeUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View verifiable badge for ${cert.title}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors duration-300 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-sm"
                  >
                    View Badge <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </Motion.article>
          ))}
        </div>
      </Motion.div>
    </section>
  );
};

export default Certifications;
