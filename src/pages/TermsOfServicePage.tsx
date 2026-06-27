import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function TermsOfServicePage() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      body: (
        <>
          By accessing or using the Ozzy’s Excavation Services website, you
          agree to these terms.
        </>
      ),
    },
    {
      title: "2. Services",
      body: (
        <>
          Ozzy’s Excavation Services provides professional excavation and
          related construction services. Estimates provided via the website are
          subject to site inspection and formal contract.
        </>
      ),
    },
    {
      title: "3. Limitation of Liability",
      body: (
        <>
          To the maximum extent permitted by law, Ozzy’s Excavation Services is
          not liable for indirect, incidental, or consequential damages
          resulting from the use of our services or website. Our liability is
          strictly limited to the amount paid for the specific service provided.
        </>
      ),
    },
    {
      title: "4. Website Content",
      body: (
        <>
          All content on this site, including images and text, is the property
          of Ozzy’s Excavation Services. Unauthorized use is prohibited.
        </>
      ),
    },
    {
      title: "5. Governing Law",
      body: (
        <>
          These terms shall be governed by the laws of Alberta. Any disputes
          shall be settled in the local courts of that jurisdiction.
        </>
      ),
    },
    {
      title: "6. Changes to Terms",
      body: (
        <>
          We reserve the right to update these terms at any time. Continued use
          of the site constitutes acceptance of updated terms.
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
              Terms and Conditions
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
