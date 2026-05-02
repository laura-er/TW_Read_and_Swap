import { Modal } from '@/components/ui/Modal';

function TermsContent() {
    return (
        <div style={{ fontSize: '13px', lineHeight: 1.7, color: 'var(--color-text)', maxHeight: '60vh', overflowY: 'auto', paddingRight: '4px' }}>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '16px' }}>Ultima actualizare: 1 ianuarie 2025</p>

            <h3 style={{ fontWeight: 700, marginBottom: '6px' }}>1. Acceptarea Termenilor</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '14px' }}>Prin crearea unui cont pe Read & Swap, ești de acord să respecți acești termeni și condiții. Dacă nu ești de acord cu oricare dintre acești termeni, nu poți utiliza platforma.</p>

            <h3 style={{ fontWeight: 700, marginBottom: '6px' }}>2. Descrierea Serviciului</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '14px' }}>Read & Swap este o platformă de schimb de cărți între utilizatori. Platforma facilitează întâlnirea dintre cititori care doresc să schimbe cărți, fără a percepe comisioane pentru tranzacții.</p>

            <h3 style={{ fontWeight: 700, marginBottom: '6px' }}>3. Contul de Utilizator</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '14px' }}>Ești responsabil pentru menținerea confidențialității contului tău și a parolei. Îți asumi responsabilitatea pentru toate activitățile care au loc în contul tău. Trebuie să ne notifici imediat dacă suspectezi o utilizare neautorizată a contului.</p>

            <h3 style={{ fontWeight: 700, marginBottom: '6px' }}>4. Regulile Platformei</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '8px' }}>Utilizatorii sunt obligați să:</p>
            <ul style={{ color: 'var(--color-text-muted)', paddingLeft: '18px', marginBottom: '14px' }}>
                <li style={{ marginBottom: '4px' }}>Ofere informații corecte despre cărțile listate (stare, autor, titlu).</li>
                <li style={{ marginBottom: '4px' }}>Respecte angajamentele de schimb asumate.</li>
                <li style={{ marginBottom: '4px' }}>Trateze alți utilizatori cu respect și bună-credință.</li>
                <li style={{ marginBottom: '4px' }}>Nu listeze cărți deteriorate fără a menționa explicit starea acestora.</li>
            </ul>

            <h3 style={{ fontWeight: 700, marginBottom: '6px' }}>5. Conținut Interzis</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '14px' }}>Este interzisă listarea de conținut ilegal, ofensator sau care încalcă drepturile de autor. Read & Swap își rezervă dreptul de a elimina orice conținut necorespunzător și de a suspenda conturile care încalcă aceste reguli.</p>

            <h3 style={{ fontWeight: 700, marginBottom: '6px' }}>6. Limitarea Răspunderii</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '14px' }}>Read & Swap nu este responsabilă pentru disputele dintre utilizatori, calitatea cărților schimbate sau orice pierderi rezultate din utilizarea platformei. Platforma servește exclusiv ca intermediar.</p>

            <h3 style={{ fontWeight: 700, marginBottom: '6px' }}>7. Modificarea Termenilor</h3>
            <p style={{ color: 'var(--color-text-muted)' }}>Ne rezervăm dreptul de a modifica acești termeni în orice moment. Utilizatorii vor fi notificați prin email cu privire la modificările semnificative. Continuarea utilizării platformei după modificări constituie acceptarea noilor termeni.</p>
        </div>
    );
}

interface TermsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function TermsModal({ isOpen, onClose }: TermsModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Termeni și Condiții" size="lg">
            <TermsContent />
        </Modal>
    );
}