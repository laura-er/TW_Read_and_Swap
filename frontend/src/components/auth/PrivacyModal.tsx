import { Modal } from '@/components/ui/Modal';

function PrivacyContent() {
    return (
        <div style={{ fontSize: '13px', lineHeight: 1.7, color: 'var(--color-text)', maxHeight: '60vh', overflowY: 'auto', paddingRight: '4px' }}>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '16px' }}>Ultima actualizare: 1 ianuarie 2025</p>

            <h3 style={{ fontWeight: 700, marginBottom: '6px' }}>1. Date Colectate</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '14px' }}>Colectăm următoarele date personale: nume, prenume, adresă de email, număr de telefon (opțional), și informații despre activitatea pe platformă (cărți listate, schimburi efectuate, recenzii).</p>

            <h3 style={{ fontWeight: 700, marginBottom: '6px' }}>2. Utilizarea Datelor</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '8px' }}>Datele tale sunt utilizate pentru:</p>
            <ul style={{ color: 'var(--color-text-muted)', paddingLeft: '18px', marginBottom: '14px' }}>
                <li style={{ marginBottom: '4px' }}>Gestionarea contului și autentificare.</li>
                <li style={{ marginBottom: '4px' }}>Facilitarea schimburilor de cărți între utilizatori.</li>
                <li style={{ marginBottom: '4px' }}>Trimiterea de notificări legate de activitatea platformei.</li>
                <li style={{ marginBottom: '4px' }}>Îmbunătățirea serviciilor oferite.</li>
            </ul>

            <h3 style={{ fontWeight: 700, marginBottom: '6px' }}>3. Partajarea Datelor</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '14px' }}>Nu vindem și nu transferăm datele tale personale către terți fără consimțământul tău explicit, cu excepția cazurilor prevăzute de lege. Numele de utilizator și profilul public sunt vizibile altor utilizatori ai platformei.</p>

            <h3 style={{ fontWeight: 700, marginBottom: '6px' }}>4. Securitatea Datelor</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '14px' }}>Implementăm măsuri tehnice și organizatorice adecvate pentru protejarea datelor tale împotriva accesului neautorizat, pierderii sau distrugerii. Parolele sunt stocate criptat și nu sunt accesibile nimănui.</p>

            <h3 style={{ fontWeight: 700, marginBottom: '6px' }}>5. Drepturile Tale</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '8px' }}>Conform GDPR, ai dreptul la:</p>
            <ul style={{ color: 'var(--color-text-muted)', paddingLeft: '18px', marginBottom: '14px' }}>
                <li style={{ marginBottom: '4px' }}>Acces la datele tale personale.</li>
                <li style={{ marginBottom: '4px' }}>Rectificarea datelor inexacte.</li>
                <li style={{ marginBottom: '4px' }}>Ștergerea datelor ("dreptul de a fi uitat").</li>
                <li style={{ marginBottom: '4px' }}>Portabilitatea datelor.</li>
                <li style={{ marginBottom: '4px' }}>Opoziția față de prelucrarea datelor.</li>
            </ul>

            <h3 style={{ fontWeight: 700, marginBottom: '6px' }}>6. Cookie-uri</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '14px' }}>Folosim cookie-uri esențiale pentru funcționarea platformei (autentificare, preferințe). Nu folosim cookie-uri de tracking sau publicitate.</p>

            <h3 style={{ fontWeight: 700, marginBottom: '6px' }}>7. Contact</h3>
            <p style={{ color: 'var(--color-text-muted)' }}>Pentru orice întrebări legate de datele tale personale, ne poți contacta la: <span style={{ color: 'var(--color-accent)' }}>privacy@readandswap.ro</span></p>
        </div>
    );
}

interface PrivacyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Politica de Confidențialitate" size="lg">
            <PrivacyContent />
        </Modal>
    );
}