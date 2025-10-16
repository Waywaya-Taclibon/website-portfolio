import { ArrowRight, ExternalLink } from "lucide-react";
import React from "react";

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
];

const Certifications = () => {
  return (
    <section id="certifications" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          My <span className="text-primary">Certifications</span>
        </h2>

        <p className="text-center text-muted-foreground-color mb-12 max-w-2xl mx-auto">
          A showcase of the certifications that reflect my continuous growth and
          pursuit of technical excellence.
        </p>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover relative"
            >
              {/* Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">{cert.title}</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  Issued by <span className="font-medium">{cert.issuer}</span>
                </p>
                <p className="text-muted-foreground text-xs mb-4">
                  {cert.date}
                </p>

                {/* Links */}
                <div className="flex items-center gap-3 flex-wrap">
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground/80 hover:text-primary transition-colors duration-300 flex items-center gap-2"
                  >
                    View Certificate <ExternalLink size={16} />
                  </a>

                  <span className="text-muted-foreground">|</span>

                  <a
                    href={cert.badgeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground/80 hover:text-primary transition-colors duration-300 flex items-center gap-2"
                  >
                    View Badge <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
