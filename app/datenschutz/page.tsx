export default function CombinedPrivacyPage() {
    return (
        <div className="w-full max-w-4xl mx-auto py-8 px-4 prose dark:prose-invert">
            {/* German Section */}
            <section className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
                <h1 className="text-3xl font-bold mb-6">Datenschutzerklärung</h1>
                <p className="text-sm text-gray-600 mb-8">Stand: 16. Juli 2025</p>

                <h2 className="text-xl font-bold mt-6">1. Einleitung</h2>
                <p className="mt-2">
                    Diese Datenschutzerklärung erläutert, wie wir Ihre personenbezogenen Daten erheben, verwenden und
                    schützen, wenn Sie unsere Website SVP.GL besuchen. Wir verpflichten uns, Ihre Privatsphäre gemäß der
                    Datenschutz-Grundverordnung (DSGVO) zu schützen.
                </p>

                <h2 className="text-xl font-bold mt-6">2. Name und Anschrift des Verantwortlichen</h2>
                <p className="mt-2">
                    Der Verantwortliche für die Erhebung und Verarbeitung von Daten auf dieser Website ist:
                </p>
                <div className="mt-2 pl-4 border-l-2 border-gray-300">
                    <p>Sven Puite</p>
                    <p>Bilker Allee 90</p>
                    <p>40217 Düsseldorf</p>
                    <p>Deutschland</p>
                    <p>E-Mail: puitesven+svp@gmail.com</p>
                </div>
                <h2 className="text-xl font-bold mt-6">3. Bereitstellung der Website und Erstellung von Logfiles
                    (Hosting bei Vercel)</h2>
                <p className="mt-2">
                    Unsere Website wird von Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA (\"Vercel\")
                    gehostet.
                </p>
                <p className="mt-2">
                    Wenn Sie unsere Website besuchen, erhebt und speichert Vercel automatisch Informationen in
                    Server-Logfiles, die Ihr Browser übermittelt. Diese Daten umfassen:
                </p>
                <ul className="mt-2 ml-6 list-disc">
                    <li>IP-Adresse</li>
                    <li>Browsertyp und Browserversion</li>
                    <li>Verwendetes Betriebssystem</li>
                    <li>Referrer URL (die zuvor besuchte Seite)</li>
                    <li>Uhrzeit der Serveranfrage</li>
                </ul>
                <p className="mt-2">
                    Die Verarbeitung dieser Daten erfolgt auf Grundlage unseres berechtigten Interesses (Art. 6 Abs. 1
                    lit. f DSGVO) an der Gewährleistung eines stabilen und sicheren Betriebs unserer Website. Eine
                    Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
                </p>

                <h2 className="text-xl font-bold mt-6">4. Datenübertragung in Drittstaaten</h2>
                <p className="mt-2">
                    Vercel betreibt ein globales Edge Network. Dies bedeutet, dass Ihre Daten (wie z.B. Ihre IP-Adresse)
                    auf Servern in Ländern außerhalb der Europäischen Union (EU), einschließlich der USA, verarbeitet
                    werden können.
                </p>
                <p className="mt-2">
                    Um ein angemessenes Datenschutzniveau zu gewährleisten, haben wir mit Vercel einen
                    Auftragsverarbeitungsvertrag (AVV) abgeschlossen. Dieser Vertrag enthält die
                    Standardvertragsklauseln (SCCs) der EU. Diese Klauseln sind ein von der Europäischen Kommission
                    genehmigter Mechanismus, der sicherstellt, dass Ihre personenbezogenen Daten bei der Übermittlung
                    außerhalb der EU nach einem Standard geschützt werden, der dem der DSGVO entspricht.
                </p>

                <h2 className="text-xl font-bold mt-6">5. Verwendung von Cookies</h2>
                <p className="mt-2">
                    Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden. Wir verwenden
                    ausschließlich Cookies, die für die Funktionalität unserer Website technisch notwendig sind.
                </p>
                <p className="mt-2">
                    <strong>Session-Cookies (AuthJS):</strong> Wenn Sie sich in ein Benutzerkonto einloggen, verwenden
                    wir ein Session-Cookie, um Ihren Anmeldestatus aufrechtzuerhalten. Dieses Cookie ist für die
                    Bereitstellung der Login-Funktionalität unerlässlich und wird gelöscht, wenn Sie Ihren Browser
                    schließen oder sich ausloggen.
                </p>
                <p className="mt-2">
                    <strong>Vercel-Toolbar-Cookies:</strong> Bei authentifizierten Administratoren können von Vercel
                    Cookies zum Zweck der Nutzung der Vercel-Development-Toolbar gesetzt werden. Diese werden nicht an
                    reguläre, nicht authentifizierte Nutzer ausgespielt.
                </p>
                <p className="mt-2">
                    Rechtsgrundlage für die Verwendung dieser technisch notwendigen Cookies ist unser berechtigtes
                    Interesse an der Bereitstellung einer funktionalen und benutzerfreundlichen Website sowie die
                    Erfüllung eines Vertrags, wenn Sie sich einloggen (Art. 6 Abs. 1 lit. b und Art. 6 Abs. 1 lit. f
                    DSGVO). Wir verwenden keine Cookies für Analyse- oder Marketingzwecke.
                </p>

                <h2 className="text-xl font-bold mt-6">6. Benutzerkonten & Login (AuthJS)</h2>
                <p className="mt-2">
                    Sie haben die Möglichkeit, sich auf unserer Website für ein Benutzerkonto zu registrieren. Bei der
                    Registrierung erheben wir die von Ihnen eingegebenen Daten, dazu können gehören:
                </p>
                <ul className="mt-2 ml-6 list-disc">
                    <li>E-Mail-Adresse</li>
                    <li>Name</li>
                </ul>
                <p className="mt-2">
                    Wir verarbeiten diese Daten zum Zweck der Bereitstellung und Verwaltung Ihres Benutzerkontos und um
                    Ihnen den Zugang zu kontospezifischen Funktionen zu ermöglichen. Rechtsgrundlage für diese
                    Verarbeitung ist die Erfüllung eines Vertrages zwischen Ihnen und uns (Art. 6 Abs. 1 lit. b DSGVO).
                    Ihre Daten werden so lange gespeichert, wie Ihr Konto auf unserer Website besteht.
                </p>

                <h2 className="text-xl font-bold mt-6">7. Webanalyse durch Vercel Analytics</h2>
                <p className="mt-2">
                    Wir verwenden Vercel Analytics, um den Traffic auf unserer Website zu verstehen und unseren Service
                    zu verbessern. Vercel Analytics ist ein datenschutzfreundliches Analysetool, das keine Cookies
                    verwendet und keine einzelnen Nutzer verfolgt oder identifiziert.
                </p>
                <p className="mt-2">
                    Es sammelt aggregierte und anonymisierte Daten, wie zum Beispiel:
                </p>
                <ul className="mt-2 ml-6 list-disc">
                    <li>Seitenaufrufe</li>
                    <li>Verweisquellen</li>
                    <li>Gerätetyp (Desktop/Mobil)</li>
                    <li>Browsertyp</li>
                    <li>Herkunftsland</li>
                </ul>
                <p className="mt-2">
                    Die Verarbeitung dieser anonymisierten Daten basiert auf unserem berechtigten Interesse (Art. 6 Abs.
                    1 lit. f DSGVO) an der Analyse des Nutzerverhaltens zur Optimierung unserer Website.
                </p>

                <h2 className="text-xl font-bold mt-6">8. Web-Schriftarten (Next.js Font-Optimierung)</h2>
                <p className="mt-2">
                    Diese Website nutzt next/font zur Darstellung von Schriftarten. Diese Funktion hostet Schriftarten
                    zum Zeitpunkt der Erstellung der Website automatisch auf unserem eigenen Server. Wenn Sie unsere
                    Seite besuchen, stellt Ihr Browser daher keine Verbindung zu externen Schriftartenanbietern (wie
                    Google) her, und Ihre IP-Adresse wird zu diesem Zweck nicht an Dritte übermittelt.
                </p>

                <h2 className="text-xl font-bold mt-6">9. Ihre Rechte als betroffene Person</h2>
                <p className="mt-2">
                    Gemäß der DSGVO haben Sie die folgenden Rechte bezüglich Ihrer personenbezogenen Daten:
                </p>
                <ul className="mt-2 ml-6 list-disc">
                    <li>Auskunftsrecht (Art. 15 DSGVO)</li>
                    <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
                    <li>Recht auf Löschung (\"Recht auf Vergessenwerden\") (Art. 17 DSGVO)</li>
                    <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                    <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
                    <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
                    <li>Recht auf Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
                </ul>
                <p className="mt-2">
                    Um diese Rechte auszuüben, kontaktieren Sie uns bitte über die in Abschnitt 2 angegebenen
                    Kontaktdaten.
                </p>
            </section>

            <hr className="my-12"/>

            {/* English Section */}
            <section className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
                <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
                <p className="text-sm text-gray-600 mb-8">Last Updated: July 16, 2025</p>

                <h2 className="text-xl font-bold mt-6">1. Introduction</h2>
                <p className="mt-2">
                    This Privacy Policy outlines how we collect, use, and protect your personal data when you visit our
                    website SVP.GL. We are committed to protecting your privacy in accordance with the General Data
                    Protection Regulation (GDPR).
                </p>

                <h2 className="text-xl font-bold mt-6">2. Data Controller</h2>
                <p className="mt-2">
                    The party responsible for the collection and processing of data on this website (the \"controller\")
                    is:
                </p>
                <div className="mt-2 pl-4 border-l-2 border-gray-300">
                    <p>Puite Sven</p>
                    <p>Bilker Allee 90</p>
                    <p>40217 Düsseldorf</p>
                    <p>Germany</p>
                    <p>Email: puitesven+svp@gmail.com</p>
                </div>
                <h2 className="text-xl font-bold mt-6">3. Data Processing When Visiting Our Website (Vercel
                    Hosting)</h2>
                <p className="mt-2">
                    Our website is hosted by Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA (\"Vercel\").
                </p>
                <p className="mt-2">
                    When you visit our website, Vercel automatically collects and stores information in server log
                    files, which your browser transmits. This data includes:
                </p>
                <ul className="mt-2 ml-6 list-disc">
                    <li>IP address</li>
                    <li>Browser type and version</li>
                    <li>Operating system used</li>
                    <li>Referrer URL (the previously visited page)</li>
                    <li>Time of the server request</li>
                </ul>
                <p className="mt-2">
                    This data is processed on the legal basis of our legitimate interest (Art. 6(1)(f) GDPR) in ensuring
                    the stable and secure operation of our website. This data is not merged with other data sources.
                </p>

                <h2 className="text-xl font-bold mt-6">4. International Data Transfer</h2>
                <p className="mt-2">
                    Vercel operates a global Edge Network. This means your data (such as your IP address) may be
                    processed on servers in countries outside the European Union (EU), including the USA.
                </p>
                <p className="mt-2">
                    To ensure an adequate level of data protection, we have entered into a Data Processing Agreement
                    (DPA) with Vercel. This agreement incorporates the EU\'s Standard Contractual Clauses (SCCs). These
                    clauses are a mechanism approved by the European Commission to ensure that your personal data is
                    protected to a standard equivalent to that of the GDPR when transferred outside the EU.
                </p>

                <h2 className="text-xl font-bold mt-6">5. Cookies</h2>
                <p className="mt-2">
                    Cookies are small text files stored on your device. We only use cookies that are technically
                    necessary for the functionality of our website.
                </p>
                <p className="mt-2">
                    <strong>Session Cookies (AuthJS):</strong> If you log into a user account, we use a session cookie
                    to maintain your login status. This cookie is essential for providing the login functionality and is
                    deleted when you close your browser or log out.
                </p>
                <p className="mt-2">
                    <strong>Vercel Toolbar Cookies:</strong> Authenticated administrators may have cookies set by Vercel
                    for the purpose of using the Vercel development toolbar. These are not served to regular,
                    non-authenticated users.
                </p>
                <p className="mt-2">
                    The legal basis for using these technically necessary cookies is our legitimate interest in
                    providing a functional and user-friendly website, as well as for the performance of a contract if
                    you log in (Art. 6(1)(b) and Art. 6(1)(f) GDPR). We do not use any cookies for analytics or
                    marketing purposes.
                </p>

                <h2 className="text-xl font-bold mt-6">6. User Accounts & Login (AuthJS)</h2>
                <p className="mt-2">
                    You have the option to register for a user account on our website. During registration, we collect
                    the data you enter, which may include:
                </p>
                <ul className="mt-2 ml-6 list-disc">
                    <li>Email address</li>
                    <li>Name</li>
                </ul>
                <p className="mt-2">
                    We process this data for the purpose of providing and managing your user account and granting you
                    access to account-specific features. The legal basis for this processing is the performance of a
                    contract between you and us (Art. 6(1)(b) GDPR). Your data will be stored for as long as your
                    account exists on our website.
                </p>

                <h2 className="text-xl font-bold mt-6">7. Web Analysis by Vercel Analytics</h2>
                <p className="mt-2">
                    We use Vercel Analytics to understand our website traffic and improve our service. Vercel Analytics
                    is a privacy-first analytics tool that does not use cookies and does not track or identify
                    individual users.
                </p>
                <p className="mt-2">
                    It collects aggregated and anonymized data, such as:
                </p>
                <ul className="mt-2 ml-6 list-disc">
                    <li>Page views</li>
                    <li>Referral sources</li>
                    <li>Device type (Desktop/Mobile)</li>
                    <li>Browser type</li>
                    <li>Country of origin</li>
                </ul>
                <p className="mt-2">
                    The processing of this anonymized data is based on our legitimate interest (Art. 6(1)(f) GDPR) in
                    analyzing user behavior to optimize our website.
                </p>

                <h2 className="text-xl font-bold mt-6">8. Web Fonts (Next.js Font Optimization)</h2>
                <p className="mt-2">
                    This website uses next/font to display fonts. This feature automatically self-hosts fonts on our own
                    server at build time. Therefore, when you visit our site, your browser does not connect to external
                    font providers (like Google), and your IP address is not transmitted to any third party for this
                    purpose.
                </p>

                <h2 className="text-xl font-bold mt-6">9. Your Rights as a Data Subject</h2>
                <p className="mt-2">
                    Under the GDPR, you have the following rights regarding your personal data:
                </p>
                <ul className="mt-2 ml-6 list-disc">
                    <li>Right of access (Art. 15 GDPR)</li>
                    <li>Right to rectification (Art. 16 GDPR)</li>
                    <li>Right to erasure (\"right to be forgotten\") (Art. 17 GDPR)</li>
                    <li>Right to restriction of processing (Art. 18 GDPR)</li>
                    <li>Right to data portability (Art. 20 GDPR)</li>
                    <li>Right to object (Art. 21 GDPR)</li>
                    <li>Right to lodge a complaint with a supervisory authority (Art. 77 GDPR)</li>
                </ul>
                <p className="mt-2">
                    To exercise these rights, please contact us using the details provided in Section 2.
                </p>
            </section>
        </div>
    );
}