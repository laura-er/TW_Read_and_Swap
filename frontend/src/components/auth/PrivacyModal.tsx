import { Modal } from '@/components/ui/Modal';
import { useLanguage } from '@/context/LanguageContext';

function PrivacyContent() {
    const { language } = useLanguage();
    const ro = language === 'ro';

    const s: React.CSSProperties = { color: 'var(--color-text-muted)', marginBottom: '14px' };
    const h: React.CSSProperties = { fontWeight: 700, marginBottom: '6px' };

    return (
        <div style={{ fontSize: '13px', lineHeight: 1.7, color: 'var(--color-text)', maxHeight: '60vh', overflowY: 'auto', paddingRight: '4px' }}>
            <p style={{ ...s, marginBottom: '16px' }}>{ro ? 'Ultima actualizare: 1 ianuarie 2025' : 'Last updated: January 1, 2025'}</p>

            <h3 style={h}>{ro ? '1. Date Colectate' : '1. Data Collected'}</h3>
            <p style={s}>{ro
                ? 'Colectăm următoarele date personale: nume, prenume, adresă de email, număr de telefon (opțional), și informații despre activitatea pe platformă (cărți listate, schimburi efectuate, recenzii).'
                : 'We collect the following personal data: first name, last name, email address, phone number (optional), and information about platform activity (listed books, completed swaps, reviews).'}</p>

            <h3 style={h}>{ro ? '2. Utilizarea Datelor' : '2. Use of Data'}</h3>
            <p style={s}>{ro ? 'Datele tale sunt utilizate pentru:' : 'Your data is used for:'}</p>
            <ul style={{ color: 'var(--color-text-muted)', paddingLeft: '18px', marginBottom: '14px' }}>
                <li style={{ marginBottom: '4px' }}>{ro ? 'Gestionarea contului și autentificare.' : 'Account management and authentication.'}</li>
                <li style={{ marginBottom: '4px' }}>{ro ? 'Facilitarea schimburilor de cărți între utilizatori.' : 'Facilitating book swaps between users.'}</li>
                <li style={{ marginBottom: '4px' }}>{ro ? 'Trimiterea de notificări legate de activitatea platformei.' : 'Sending notifications related to platform activity.'}</li>
                <li style={{ marginBottom: '4px' }}>{ro ? 'Îmbunătățirea serviciilor oferite.' : 'Improving the services offered.'}</li>
            </ul>

            <h3 style={h}>{ro ? '3. Partajarea Datelor' : '3. Data Sharing'}</h3>
            <p style={s}>{ro
                ? 'Nu vindem și nu transferăm datele tale personale către terți fără consimțământul tău explicit, cu excepția cazurilor prevăzute de lege. Numele de utilizator și profilul public sunt vizibile altor utilizatori ai platformei.'
                : 'We do not sell or transfer your personal data to third parties without your explicit consent, except as required by law. Your username and public profile are visible to other platform users.'}</p>

            <h3 style={h}>{ro ? '4. Securitatea Datelor' : '4. Data Security'}</h3>
            <p style={s}>{ro
                ? 'Implementăm măsuri tehnice și organizatorice adecvate pentru protejarea datelor tale împotriva accesului neautorizat, pierderii sau distrugerii. Parolele sunt stocate criptat și nu sunt accesibile nimănui.'
                : 'We implement appropriate technical and organizational measures to protect your data against unauthorized access, loss, or destruction. Passwords are stored encrypted and are not accessible to anyone.'}</p>

            <h3 style={h}>{ro ? '5. Drepturile Tale' : '5. Your Rights'}</h3>
            <p style={s}>{ro ? 'Conform GDPR, ai dreptul la:' : 'Under GDPR, you have the right to:'}</p>
            <ul style={{ color: 'var(--color-text-muted)', paddingLeft: '18px', marginBottom: '14px' }}>
                <li style={{ marginBottom: '4px' }}>{ro ? 'Acces la datele tale personale.' : 'Access your personal data.'}</li>
                <li style={{ marginBottom: '4px' }}>{ro ? 'Rectificarea datelor inexacte.' : 'Rectification of inaccurate data.'}</li>
                <li style={{ marginBottom: '4px' }}>{ro ? 'Ștergerea datelor ("dreptul de a fi uitat").' : 'Erasure of data ("right to be forgotten").'}</li>
                <li style={{ marginBottom: '4px' }}>{ro ? 'Portabilitatea datelor.' : 'Data portability.'}</li>
                <li style={{ marginBottom: '4px' }}>{ro ? 'Opoziția față de prelucrarea datelor.' : 'Objection to data processing.'}</li>
            </ul>

            <h3 style={h}>{ro ? '6. Cookie-uri' : '6. Cookies'}</h3>
            <p style={s}>{ro
                ? 'Folosim cookie-uri esențiale pentru funcționarea platformei (autentificare, preferințe). Nu folosim cookie-uri de tracking sau publicitate.'
                : 'We use essential cookies for platform functionality (authentication, preferences). We do not use tracking or advertising cookies.'}</p>

            <h3 style={h}>{ro ? '7. Contact' : '7. Contact'}</h3>
            <p style={s}>{ro
                ? <>Pentru orice întrebări legate de datele tale personale, ne poți contacta la: <span style={{ color: 'var(--color-accent)' }}>privacy@readandswap.ro</span></>
                : <>For any questions regarding your personal data, you can contact us at: <span style={{ color: 'var(--color-accent)' }}>privacy@readandswap.ro</span></>}</p>
        </div>
    );
}

interface PrivacyModalProps { isOpen: boolean; onClose: () => void; }

export function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
    const { language } = useLanguage();
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={language === 'ro' ? 'Politica de Confidențialitate' : 'Privacy Policy'} size="lg">
            <PrivacyContent />
        </Modal>
    );
}
