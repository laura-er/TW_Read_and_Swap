import { Modal } from '@/components/ui/Modal';
import { useLanguage } from '@/context/LanguageContext';

function TermsContent() {
    const { language } = useLanguage();
    const ro = language === 'ro';

    const s: React.CSSProperties = { color: 'var(--color-text-muted)', marginBottom: '14px' };
    const h: React.CSSProperties = { fontWeight: 700, marginBottom: '6px' };

    return (
        <div style={{ fontSize: '13px', lineHeight: 1.7, color: 'var(--color-text)', maxHeight: '60vh', overflowY: 'auto', paddingRight: '4px' }}>
            <p style={{ ...s, marginBottom: '16px' }}>{ro ? 'Ultima actualizare: 1 ianuarie 2025' : 'Last updated: January 1, 2025'}</p>

            <h3 style={h}>{ro ? '1. Acceptarea Termenilor' : '1. Acceptance of Terms'}</h3>
            <p style={s}>{ro
                ? 'Prin crearea unui cont pe Read & Swap, ești de acord să respecți acești termeni și condiții. Dacă nu ești de acord cu oricare dintre acești termeni, nu poți utiliza platforma.'
                : 'By creating an account on Read & Swap, you agree to comply with these terms and conditions. If you do not agree with any of these terms, you may not use the platform.'}</p>

            <h3 style={h}>{ro ? '2. Descrierea Serviciului' : '2. Service Description'}</h3>
            <p style={s}>{ro
                ? 'Read & Swap este o platformă de schimb de cărți între utilizatori. Platforma facilitează întâlnirea dintre cititori care doresc să schimbe cărți, fără a percepe comisioane pentru tranzacții.'
                : 'Read & Swap is a book exchange platform between users. The platform facilitates connections between readers who wish to swap books, without charging commissions for transactions.'}</p>

            <h3 style={h}>{ro ? '3. Contul de Utilizator' : '3. User Account'}</h3>
            <p style={s}>{ro
                ? 'Ești responsabil pentru menținerea confidențialității contului tău și a parolei. Îți asumi responsabilitatea pentru toate activitățile care au loc în contul tău. Trebuie să ne notifici imediat dacă suspectezi o utilizare neautorizată a contului.'
                : 'You are responsible for maintaining the confidentiality of your account and password. You assume responsibility for all activities that occur in your account. You must notify us immediately if you suspect unauthorized use of your account.'}</p>

            <h3 style={h}>{ro ? '4. Regulile Platformei' : '4. Platform Rules'}</h3>
            <p style={s}>{ro ? 'Utilizatorii sunt obligați să:' : 'Users are required to:'}</p>
            <ul style={{ color: 'var(--color-text-muted)', paddingLeft: '18px', marginBottom: '14px' }}>
                <li style={{ marginBottom: '4px' }}>{ro ? 'Ofere informații corecte despre cărțile listate (stare, autor, titlu).' : 'Provide accurate information about listed books (condition, author, title).'}</li>
                <li style={{ marginBottom: '4px' }}>{ro ? 'Respecte angajamentele de schimb asumate.' : 'Honor agreed swap commitments.'}</li>
                <li style={{ marginBottom: '4px' }}>{ro ? 'Trateze alți utilizatori cu respect și bună-credință.' : 'Treat other users with respect and good faith.'}</li>
                <li style={{ marginBottom: '4px' }}>{ro ? 'Nu listeze cărți deteriorate fără a menționa explicit starea acestora.' : 'Not list damaged books without explicitly mentioning their condition.'}</li>
            </ul>

            <h3 style={h}>{ro ? '5. Conținut Interzis' : '5. Prohibited Content'}</h3>
            <p style={s}>{ro
                ? 'Este interzisă listarea de conținut ilegal, ofensator sau care încalcă drepturile de autor. Read & Swap își rezervă dreptul de a elimina orice conținut necorespunzător și de a suspenda conturile care încalcă aceste reguli.'
                : 'Listing illegal, offensive, or copyright-infringing content is prohibited. Read & Swap reserves the right to remove any inappropriate content and suspend accounts that violate these rules.'}</p>

            <h3 style={h}>{ro ? '6. Limitarea Răspunderii' : '6. Limitation of Liability'}</h3>
            <p style={s}>{ro
                ? 'Read & Swap nu este responsabilă pentru disputele dintre utilizatori, calitatea cărților schimbate sau orice pierderi rezultate din utilizarea platformei. Platforma servește exclusiv ca intermediar.'
                : 'Read & Swap is not responsible for disputes between users, the quality of exchanged books, or any losses resulting from the use of the platform. The platform serves exclusively as an intermediary.'}</p>

            <h3 style={h}>{ro ? '7. Modificarea Termenilor' : '7. Modification of Terms'}</h3>
            <p style={s}>{ro
                ? 'Ne rezervăm dreptul de a modifica acești termeni în orice moment. Utilizatorii vor fi notificați prin email cu privire la modificările semnificative. Continuarea utilizării platformei după modificări constituie acceptarea noilor termeni.'
                : 'We reserve the right to modify these terms at any time. Users will be notified by email of significant changes. Continued use of the platform after changes constitutes acceptance of the new terms.'}</p>
        </div>
    );
}

interface TermsModalProps { isOpen: boolean; onClose: () => void; }

export function TermsModal({ isOpen, onClose }: TermsModalProps) {
    const { language } = useLanguage();
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={language === 'ro' ? 'Termeni și Condiții' : 'Terms and Conditions'} size="lg">
            <TermsContent />
        </Modal>
    );
}
