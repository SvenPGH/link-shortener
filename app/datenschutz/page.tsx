export default function CombinedPrivacyPage() {
    return (
        <div className="w-full max-w-4xl mx-auto py-8 px-4 prose dark:prose-invert">
            {/* German Section */}
            <section>
                <h1>Datenschutzerklärung</h1>

                <h2 className="text-xl font-bold mt-6">1. Datenschutz auf einen Blick</h2>
                <p>
                    Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                </p>

                <h2 className="text-xl font-bold mt-6">2. Datenerfassung auf dieser Website</h2>
                <p>
                    Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen. Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie bei der Registrierung eingeben.
                </p>
                <p>
                    Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
                </p>

                <h2 className="text-xl font-bold mt-6">3. Ihre Rechte</h2>
                <p>
                    Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.
                </p>
            </section>

            <hr className="my-12" />

            {/* English Section */}
            <section>
                <h1>Privacy Policy</h1>

                <h2 className="text-xl font-bold mt-6">1. Data Protection at a Glance</h2>
                <p>
                    The following notices provide a simple overview of what happens to your personal data when you visit this website. Personal data is any data with which you can be personally identified.
                </p>

                <h2 className="text-xl font-bold mt-6">2. Data Collection on This Website</h2>
                <p>
                    Data processing on this website is carried out by the website operator. Their contact details can be found in the imprint of this website. Your data is collected on the one hand when you provide it to us. This can be, for example, data that you enter during registration.
                </p>
                <p>
                    Other data is collected automatically by our IT systems when you visit the website. This is mainly technical data (e.g., internet browser, operating system, or time of page access). This data is collected automatically as soon as you enter this website.
                </p>

                <h2 className="text-xl font-bold mt-6">3. Your Rights</h2>
                <p>
                    You have the right at any time to receive information free of charge about the origin, recipient, and purpose of your stored personal data. You also have a right to request the correction, blocking, or deletion of this data. For this purpose, as well as for further questions on the subject of data protection, you can contact us at any time at the address given in the imprint.
                </p>
            </section>
        </div>
    );
}