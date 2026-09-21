import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import Container from "../../components/Container";
import SectionTitle from "../../components/SectionTitle";
import Button from "../../components/Button";
import SEO from "../../components/SEO";
import api from "../../services/api";

export default function Contact({ profile }) {
  const { t } = useTranslation();

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
    profile?.email ||
    "contact@lucdeguenon.com";

  const phone = profile?.phone || "";

  const location =
    profile?.location ||
    t("contact.location");

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
        t("contact.success")
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
          t("contact.error")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title={t("contact.title")}
        description={t(
          "contact.description"
        )}
      />

      <main className="contact-page">
        <section className="page-hero">
          <Container>
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
              }}
            >
              <span className="page-hero__eyebrow">
                {t("contact.eyebrow")}
              </span>

              <h1 className="page-hero__title">
                {t("contact.title")}
              </h1>

              <p className="page-hero__description">
                {t("contact.description")}
              </p>
            </motion.div>
          </Container>
        </section>

        <section className="contact-page__content">
          <Container>
            <div className="contact-page__grid">
              <motion.div
                className="contact-page__info"
                initial={{
                  opacity: 0,
                  x: -35,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                }}
              >
                <SectionTitle
                  align="left"
                  eyebrow={t(
                    "contact.exchange"
                  )}
                  title={t(
                    "contact.stayInTouch"
                  )}
                  description={t(
                    "contact.stayInTouchDescription"
                  )}
                />

                <div className="contact-details">
                  <a
                    href={`mailto:${email}`}
                    className="contact-detail"
                  >
                    <span className="contact-detail__icon">
                      <Mail
                        size={21}
                        aria-hidden="true"
                      />
                    </span>

                    <span>
                      <strong>
                        {t("contact.email")}
                      </strong>

                      <small>
                        {email}
                      </small>
                    </span>
                  </a>

                  {phone && (
                    <a
                      href={`tel:${phone}`}
                      className="contact-detail"
                    >
                      <span className="contact-detail__icon">
                        <Phone
                          size={21}
                          aria-hidden="true"
                        />
                      </span>

                      <span>
                        <strong>
                          {t("contact.phone")}
                        </strong>

                        <small>
                          {phone}
                        </small>
                      </span>
                    </a>
                  )}

                  <div className="contact-detail">
                    <span className="contact-detail__icon">
                      <MapPin
                        size={21}
                        aria-hidden="true"
                      />
                    </span>

                    <span>
                      <strong>
                        {t(
                          "contact.location"
                        )}
                      </strong>

                      <small>
                        {location}
                      </small>
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="contact-page__form-wrapper"
                initial={{
                  opacity: 0,
                  x: 35,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                }}
              >
                <form
                  className="contact-form"
                  onSubmit={handleSubmit}
                >
                  <div className="contact-form__row">
                    <label>
                      {t("contact.name")}

                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder={t(
                          "contact.namePlaceholder"
                        )}
                        autoComplete="name"
                        required
                      />
                    </label>

                    <label>
                      {t("contact.email")}

                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder={t(
                          "contact.emailPlaceholder"
                        )}
                        autoComplete="email"
                        required
                      />
                    </label>
                  </div>

                  <div className="contact-form__row">
                    <label>
                      {t("contact.phone")}

                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder={t(
                          "contact.phonePlaceholder"
                        )}
                        autoComplete="tel"
                      />
                    </label>

                    <label>
                      {t("contact.subject")}

                      <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder={t(
                          "contact.subjectPlaceholder"
                        )}
                        required
                      />
                    </label>
                  </div>

                  <label>
                    {t("contact.message")}

                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder={t(
                        "contact.messagePlaceholder"
                      )}
                      rows="7"
                      required
                    />
                  </label>

                  {success && (
                    <div
                      className="contact-form__success"
                      role="status"
                    >
                      <CheckCircle
                        size={19}
                        aria-hidden="true"
                      />

                      <span>
                        {success}
                      </span>
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
                      ? t("contact.sending")
                      : t("contact.send")}
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
