import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function PrivacyCompliancePage() {
  const sections = [
    {
      title: "1. Information We Collect",
      body: (
        <>
          We collect information you voluntarily provide through our contact
          forms, including name, phone number, email address, and project
          details. This is used solely to facilitate your inquiry and provide
          requested services.
        </>
      ),
    },
    {
      title: "2. How We Use Your Data",
      body: (
        <ul className="grid gap-3 pl-5">
          <li className="list-disc">
            To schedule site visits and provide estimates.
          </li>
          <li className="list-disc">
            To communicate regarding ongoing projects.
          </li>
          <li className="list-disc">
            To send automated status updates or follow-ups regarding your
            request, including SMS messaging.
          </li>
        </ul>
      ),
    },
    {
      title: "3. Automated Communication (Text-Backs)",
      body: (
        <>
          If you provide your mobile number, you consent to receive
          communications from Ozzy’s Excavation Services, including automated
          text messages regarding your inquiry. You may opt out at any time by
          replying "STOP."
        </>
      ),
    },
    {
      title: "4. Data Sharing",
      body: (
        <>
          We do not sell your personal information. We may share data with
          service partners strictly to fulfill operational tasks, such as system
          management or CRM support, under strict confidentiality.
        </>
      ),
    },
    {
      title: "5. Data Security",
      body: (
        <>
          We implement industry-standard security measures to protect your
          information from unauthorized access.
        </>
      ),
    },
    {
      title: "6. Your Rights",
      body: (
        <>
          You have the right to request access to the information we hold about
          you or request its deletion by contacting us at{" "}
          <a
            href="mailto:admin@ozzysexcavation.ca"
            className="font-black text-[#B5553A] hover:text-[#D5560B]"
          >
            admin@ozzysexcavation.ca
          </a>
          .
        </>
      ),
    },
  ];
  return (
    <>
      <Navbar />
      <main className="bg-white">
        <section className="bg-[#40190E] px-5 py-20 text-white">
          <div className="mx-auto max-w-5xl">
            <p className="font-black uppercase tracking-[0.2em] text-[#D5560B]">
              Legal
            </p>
            <h1 className="mt-4 text-4xl font-black md:text-6xl">
              Privacy Policy
            </h1>
          </div>
        </section>
        <section className="px-5 py-16">
          <div className="mx-auto grid max-w-5xl gap-8">
            {sections.map((section) => (
              <article
                key={section.title}
                className="rounded-[2rem] border border-[#E0DBD7] bg-white p-6 shadow-xl shadow-[#40190E]/5 md:p-8"
              >
                <h2 className="text-2xl font-black text-[#40190E]">
                  {section.title}
                </h2>
                <div className="mt-4 text-base leading-8 text-[#40190E]">
                  {section.body}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
