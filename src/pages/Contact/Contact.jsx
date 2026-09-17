import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

import Container from "../../components/Container";
import SectionTitle from "../../components/SectionTitle";
import Button from "../../components/Button";
import SEO from "../../components/SEO";
import api from "../../services/api";

export default function Contact({ profile }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const email =
    profile?.email || "contact@lucdeguenon.com";

  const phone =
    profile?.phone || "";

  const location =
    profile?.location || "Dakar, Sénégal";

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      await api.post("/contact", form);

      setSuccess(
        "Votre message a bien été envoyé. Merci pour votre confiance."
      );

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Impossible d'envoyer votre message. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact"
        description="Contactez Luc DEGUENON pour discuter de votre projet numérique."
      />

      <main className="contact-page">
        <section className="page-hero">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="page-hero__eyebrow">
                CONTACT
              </span>

              <h1 className="page-hero__title">
                Parlons de votre projet.
              </h1>

              <p className="page-hero__description">
                Une idée, un besoin ou un projet à développer ?
                Envoyez-moi un message.
              </p>
            </motion.div>
          </Container>
        </section>

        <section className="contact-page__content">
          <Container>
            <div className="contact-page__grid">
              <motion.div
                className="contact-page__info"
                initial={{ opacity: 0, x: -35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <SectionTitle
                  align="left"
                  eyebrow="ÉCHANGEONS"
                  title="Restons en contact"
                  description="Présentez-moi votre besoin et nous pourrons échanger sur les prochaines étapes."
                />

                <div className="contact-details">
                  <a
                    href={`mailto:${email}`}
                    className="contact-detail"
                  >
                    <span className="contact-detail__icon">
                      <Mail size={21} />
                    </span>

                    <span>
                      <strong>Email</strong>
                      <small>{email}</small>
                    </span>
                  </a>

                  {phone && (
                    <a
                      href={`tel:${phone}`}
                      className="contact-detail"
                    >
                      <span className="contact-detail__icon">
                        <Phone size={21} />
                      </span>

                      <span>
                        <strong>Téléphone</strong>
                        <small>{phone}</small>
                      </span>
                    </a>
                  )}

                  <div className="contact-detail">
                    <span className="contact-detail__icon">
                      <MapPin size={21} />
                    </span>

                    <span>
                      <strong>Localisation</strong>
                      <small>{location}</small>
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="contact-page__form-wrapper"
                initial={{ opacity: 0, x: 35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <form
                  className="contact-form"
                  onSubmit={handleSubmit}
                >
                  <div className="contact-form__row">
                    <label>
                      Nom
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Votre nom"
                        required
                      />
                    </label>

                    <label>
                      Email
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="votre@email.com"
                        required
                      />
                    </label>
                  </div>

                  <div className="contact-form__row">
                    <label>
                      Téléphone
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+221 ..."
                      />
                    </label>

                    <label>
                      Objet
                      <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="Objet de votre demande"
                        required
                      />
                    </label>
                  </div>

                  <label>
                    Message
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Décrivez votre projet..."
                      rows="7"
                      required
                    />
                  </label>

                  {success && (
                    <div
                      className="contact-form__success"
                      role="status"
                    >
                      <CheckCircle size={19} />
                      <span>{success}</span>
                    </div>
                  )}

                  {error && (
                    <div
                      className="contact-form__error"
                      role="alert"
                    >
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    icon={<Send size={18} />}
                  >
                    {loading
                      ? "Envoi en cours..."
                      : "Envoyer le message"}
                  </Button>
                </form>
              </motion.div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
