import L from "leaflet";
import { Link } from "react-router-dom";
import { Circle, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { colorFor, hitLink, nameFor } from "../lib/categories";
import type { SearchHit } from "../lib/types";

const CENTER: [number, number] = [4.6112, -74.1508];

function pin(color: string): L.DivIcon {
  return L.divIcon({
    className: "",
    html: `<span class="pin" style="background:${color};color:${color}"></span>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    popupAnchor: [0, -12],
  });
}

interface MapViewProps {
  hits: SearchHit[];
  height?: string;
  zoom?: number;
  showBarrio?: boolean;
  center?: [number, number];
}

export function MapView({
  hits,
  height = "h-[420px]",
  zoom = 15,
  showBarrio = true,
  center = CENTER,
}: MapViewProps) {
  return (
    <div className={`${height} overflow-hidden rounded-2xl border border-white/10`}>
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} className="z-0">
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ"
          maxNativeZoom={16}
          maxZoom={19}
        />
        {showBarrio && (
          <Circle
            center={center}
            radius={430}
            pathOptions={{ color: "#FF2D95", weight: 1.5, dashArray: "6 8", fillOpacity: 0.05 }}
          />
        )}
        {hits
          .filter((hit) => Number.isFinite(hit.lat) && Number.isFinite(hit.lon))
          .map((hit) => (
            <Marker key={`${hit.resource}-${hit.id}`} position={[hit.lat, hit.lon]} icon={pin(colorFor(hit.categorySlug))}>
              <Popup>
                <div className="min-w-[180px] text-sm">
                  <p className="font-bold" style={{ color: colorFor(hit.categorySlug) }}>
                    {nameFor(hit.categorySlug)}
                  </p>
                  <p className="mt-1 font-semibold text-white">{hit.title}</p>
                  <p className="text-xs text-slate-400">{hit.subtitle}</p>
                  <Link to={hitLink(hit)} className="mt-2 inline-block text-xs font-semibold">
                    Ver detalle
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
