import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

declare global { interface Window { L: any; } }

export interface LocationValue {
    city: string;
    lat: number | null;
    lon: number | null;
}

interface Props {
    value: LocationValue;
    onChange: (v: LocationValue) => void;
    required?: boolean;
    hasError?: boolean;
}

export function LocationPickerMap({ value, onChange, required, hasError }: Props) {
    const { isDark } = useTheme();
    const mapRef = useRef<HTMLDivElement>(null);
    const leafletMap = useRef<any>(null);
    const markerRef = useRef<any>(null);
    const [leafletReady, setLeafletReady] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searching, setSearching] = useState(false);
    const [gpsLoading, setGpsLoading] = useState(false);
    const [searchError, setSearchError] = useState('');

    useEffect(() => {
        if (window.L) { setLeafletReady(true); return; }
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.onload = () => setLeafletReady(true);
        document.head.appendChild(script);
    }, []);

    const makeIcon = () => window.L.divIcon({
        className: '',
        html: `<div style="width:26px;height:26px;background:${isDark ? '#d4703a' : '#b8621e'};border:3px solid white;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 2px 8px rgba(0,0,0,0.35)"></div>`,
        iconSize: [26, 26], iconAnchor: [13, 26],
    });

    const placeMarker = (lat: number, lng: number) => {
        if (!leafletMap.current) return;
        if (markerRef.current) markerRef.current.remove();
        markerRef.current = window.L.marker([lat, lng], { icon: makeIcon() }).addTo(leafletMap.current);
    };

    const reverseGeocode = async (lat: number, lon: number): Promise<string> => {
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
            const data = await res.json();
            return data.address?.city || data.address?.town || data.address?.village || data.address?.county || data.display_name?.split(',')[0] || '';
        } catch { return ''; }
    };

    useEffect(() => {
        if (!leafletReady || !mapRef.current || leafletMap.current) return;
        const L = window.L;
        const map = L.map(mapRef.current, { zoomControl: true, attributionControl: false }).setView([47.0, 29.0], 6);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        leafletMap.current = map;

        map.on('click', async (e: any) => {
            const { lat, lng } = e.latlng;
            placeMarker(lat, lng);
            const city = await reverseGeocode(lat, lng);
            onChange({ city, lat, lon: lng });
        });

        if (value.lat && value.lon) {
            placeMarker(value.lat, value.lon);
            map.setView([value.lat, value.lon], 10);
        }
    }, [leafletReady]);

    const handleSearch = async () => {
        if (!searchText.trim()) return;
        setSearching(true); setSearchError('');
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchText)}&format=json&limit=1`);
            const data = await res.json();
            if (!data.length) { setSearchError('Locatia nu a fost gasita. Incearca alt nume.'); return; }
            const latN = parseFloat(data[0].lat), lonN = parseFloat(data[0].lon);
            const city = data[0].display_name.split(',')[0];
            onChange({ city, lat: latN, lon: lonN });
            if (leafletMap.current) { leafletMap.current.setView([latN, lonN], 12); placeMarker(latN, lonN); }
        } catch { setSearchError('Eroare la cautare.'); }
        finally { setSearching(false); }
    };

    const handleGps = () => {
        if (!navigator.geolocation) return;
        setGpsLoading(true);
        navigator.geolocation.getCurrentPosition(async (pos) => {
            const { latitude: lat, longitude: lon } = pos.coords;
            const city = await reverseGeocode(lat, lon);
            onChange({ city, lat, lon });
            if (leafletMap.current) { leafletMap.current.setView([lat, lon], 12); placeMarker(lat, lon); }
            setGpsLoading(false);
        }, () => setGpsLoading(false));
    };

    const accentColor = isDark ? '#d4703a' : '#b8621e';
    const bg = isDark ? 'rgba(40,26,10,0.9)' : 'rgba(255,248,230,0.9)';
    const borderColor = hasError ? '#e05030' : isDark ? 'rgba(180,120,40,0.22)' : 'rgba(190,150,60,0.35)';
    const border = `1px solid ${borderColor}`;
    const textColor = isDark ? '#e8d5b0' : '#2a1f08';
    const mutedColor = isDark ? '#7a5a30' : '#8a6830';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: hasError ? '#e05030' : mutedColor }}>
                LOCATIE{required && <span style={{ color: '#e05030', marginLeft: '3px' }}>*</span>}
            </label>
            <div style={{ display: 'flex', gap: '6px' }}>
                <input
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleSearch())}
                    placeholder="Cauta un oras (ex: Chisinau)"
                    style={{ flex: 1, padding: '9px 12px', fontSize: '12px', borderRadius: '10px', background: bg, border, color: textColor, outline: 'none', boxSizing: 'border-box' as const }}
                />
                <button type="button" onClick={handleSearch} disabled={searching}
                    style={{ padding: '9px 12px', borderRadius: '10px', border: 'none', background: accentColor, color: 'white', fontSize: '11px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' as const }}>
                    {searching ? '...' : 'Cauta'}
                </button>
                <button type="button" onClick={handleGps} disabled={gpsLoading} title="Foloseste locatia mea"
                    style={{ padding: '9px 10px', borderRadius: '10px', border, background: bg, color: textColor, fontSize: '14px', cursor: 'pointer' }}>
                    {gpsLoading ? '...' : '📍'}
                </button>
            </div>
            {searchError && <p style={{ fontSize: '11px', color: '#e05030', margin: 0 }}>⚠ {searchError}</p>}
            <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border }}>
                {!leafletReady && (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: bg, zIndex: 10, fontSize: '12px', color: mutedColor }}>
                        Se incarca harta...
                    </div>
                )}
                <div ref={mapRef} style={{ height: '200px', width: '100%' }} />
                {!value.lat && leafletReady && (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 5 }}>
                        <div style={{ background: isDark ? 'rgba(40,26,10,0.85)' : 'rgba(255,248,230,0.85)', padding: '8px 14px', borderRadius: '20px', fontSize: '11px', color: mutedColor, backdropFilter: 'blur(4px)' }}>
                            👆 Click pe harta sau cauta un oras
                        </div>
                    </div>
                )}
            </div>
            {value.city && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 12px', borderRadius: '10px', background: isDark ? 'rgba(212,112,58,0.12)' : 'rgba(184,98,30,0.08)', border: `1px solid ${isDark ? 'rgba(212,112,58,0.3)' : 'rgba(184,98,30,0.2)'}` }}>
                    <span style={{ fontSize: '14px' }}>📍</span>
                    <span style={{ fontSize: '12px', color: textColor, fontWeight: 500 }}>{value.city}</span>
                    <button type="button" onClick={() => { onChange({ city: '', lat: null, lon: null }); if (markerRef.current) { markerRef.current.remove(); markerRef.current = null; } }}
                        style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: mutedColor, fontSize: '12px' }}>✕</button>
                </div>
            )}
            {hasError && <p style={{ fontSize: '11px', color: '#e05030', margin: 0 }}>⚠ Locatia este obligatorie.</p>}
        </div>
    );
}
