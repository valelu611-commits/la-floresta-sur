interface CoordinateFieldsProps {
  lat: unknown;
  lon: unknown;
  onLat: (value: number) => void;
  onLon: (value: number) => void;
}

export function CoordinateFields({ lat, lon, onLat, onLon }: CoordinateFieldsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div>
        <label className="label">Latitud</label>
        <input
          type="number"
          step="0.0001"
          value={Number(lat ?? 4.6112)}
          onChange={(event) => onLat(Number(event.target.value))}
          required
          className="field"
        />
      </div>
      <div>
        <label className="label">Longitud</label>
        <input
          type="number"
          step="0.0001"
          value={Number(lon ?? -74.1508)}
          onChange={(event) => onLon(Number(event.target.value))}
          required
          className="field"
        />
      </div>
    </div>
  );
}
