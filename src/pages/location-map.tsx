import { useEffect, useMemo, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { getStoredWorkers } from "../data/workers";
import { useLocalization } from "../localization";

type LocationRole = "worker" | "public";
type TrackedLocation = {
  id: string;
  name: string;
  role: LocationRole;
  latitude: number;
  longitude: number;
  status: string;
  updated: string;
};

const workerCoordinates = [
  [12.6667, 75.3844],
  [12.6708, 75.3906],
  [12.6622, 75.3779],
] as const;

const publicLocations: TrackedLocation[] = [
  { id: "public-1", name: "Public user #1042", role: "public", latitude: 12.6689, longitude: 75.3812, status: "Pickup requested", updated: "2 min ago" },
  { id: "public-2", name: "Public user #1088", role: "public", latitude: 12.6641, longitude: 75.3875, status: "Request accepted", updated: "6 min ago" },
  { id: "public-3", name: "Public user #1124", role: "public", latitude: 12.6724, longitude: 75.3868, status: "Waiting for worker", updated: "11 min ago" },
];

const mapboxTokenCandidates = [
  import.meta.env.VITE_MAPBOX_PUBLIC_KEY,
  import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
]
  .map((value) => value?.trim())
  .filter((value): value is string => Boolean(value));
const mapboxToken = mapboxTokenCandidates.find((value) => value.startsWith("pk."));
const mapboxSetupMessage = mapboxTokenCandidates.length === 0
  ? "Add a public Mapbox token beginning with pk. to VITE_MAPBOX_PUBLIC_KEY or VITE_MAPBOX_ACCESS_TOKEN in .env, then restart the development server."
  : !mapboxToken
    ? "The configured Mapbox token is secret (sk.). Use the public token beginning with pk.; never put a secret token in browser code."
    : "";
const mapboxStyle = import.meta.env.VITE_MAPBOX_STYLE_URI?.trim() || "mapbox://styles/mapbox/streets-v12";

function LocationMap() {
  const { t } = useLocalization();
  const mapElement = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const markerLookup = useRef(new Map<string, mapboxgl.Marker>());
  const [filter, setFilter] = useState<"all" | LocationRole>("all");
  const [mapError, setMapError] = useState("");

  const locations = useMemo<TrackedLocation[]>(() => {
    const storedWorkers = getStoredWorkers();
    const workers = workerCoordinates.map(([latitude, longitude], index) => ({
      id: storedWorkers[index]?.id ?? `worker-demo-${index}`,
      name: storedWorkers[index]?.name ?? `Field worker ${index + 1}`,
      role: "worker" as const,
      latitude,
      longitude,
      status: index === 1 ? "Available" : "On duty",
      updated: `${index * 3 + 1} min ago`,
    }));
    return [...workers, ...publicLocations];
  }, []);

  const visibleLocations = locations.filter((location) => filter === "all" || location.role === filter);

  useEffect(() => {
    if (!mapElement.current || mapInstance.current || !mapboxToken) return;
    const map = new mapboxgl.Map({
      accessToken: mapboxToken,
      container: mapElement.current,
      style: mapboxStyle,
      center: [75.3844, 12.6667],
      zoom: 14,
      pitch: 35,
      antialias: true,
    });
    map.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), "bottom-right");
    map.addControl(new mapboxgl.FullscreenControl(), "bottom-right");
    map.addControl(new mapboxgl.ScaleControl({ unit: "metric" }), "bottom-left");
    map.on("error", (event) => {
      const message = event.error?.message ?? "";
      if (/401|403|access token|unauthorized|not authorized/i.test(message)) {
        setMapError("Mapbox rejected the request. Allow localhost:5173 and 127.0.0.1:5173 in the token URL restrictions, and make sure the style URI is public and accessible to this token.");
      }
    });
    mapInstance.current = map;

    return () => {
      markers.current.forEach((marker) => marker.remove());
      markers.current = [];
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;
    markers.current.forEach((marker) => marker.remove());
    markers.current = [];
    markerLookup.current.clear();

    visibleLocations.forEach((location) => {
      const markerElement = document.createElement("button");
      markerElement.type = "button";
      markerElement.className = `role-map-marker ${location.role}`;
      markerElement.textContent = location.role === "worker" ? "W" : "U";
      markerElement.setAttribute("aria-label", location.name);

      const popup = document.createElement("div");
      popup.className = "location-popup";
      const name = document.createElement("strong");
      name.textContent = location.name;
      const role = document.createElement("span");
      role.textContent = location.role === "worker" ? "Worker" : "Public user";
      const detail = document.createElement("small");
      detail.textContent = `${location.status} · ${location.updated}`;
      popup.append(name, role, detail);

      const marker = new mapboxgl.Marker({ element: markerElement, anchor: "bottom" })
        .setLngLat([location.longitude, location.latitude])
        .setPopup(new mapboxgl.Popup({ offset: 28, closeButton: false }).setDOMContent(popup))
        .addTo(map);
      markers.current.push(marker);
      markerLookup.current.set(location.id, marker);
    });

    if (visibleLocations.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      visibleLocations.forEach((location) => bounds.extend([location.longitude, location.latitude]));
      map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 700 });
    }
  }, [visibleLocations]);

  function focusLocation(location: TrackedLocation) {
    mapInstance.current?.flyTo({ center: [location.longitude, location.latitude], zoom: 17, pitch: 45, duration: 800 });
    markerLookup.current.get(location.id)?.togglePopup();
  }

  const workerCount = locations.filter((location) => location.role === "worker").length;
  const publicCount = locations.filter((location) => location.role === "public").length;

  return (
    <main className="location-page">
      <div className="map-page-heading">
        <div><p className="eyebrow">{t("locationMap")}</p><h1>{t("liveLocations")}</h1><p>{t("locationMapSubtitle")}</p></div>
        <div className="map-status"><span /> {t("liveTracking")}</div>
      </div>

      <div className="map-stat-row">
        <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}><span className="all-dot" /> <strong>{locations.length}</strong><small>{t("allLocations")}</small></button>
        <button className={filter === "worker" ? "active" : ""} onClick={() => setFilter("worker")}><span className="worker-dot" /> <strong>{workerCount}</strong><small>{t("workers")}</small></button>
        <button className={filter === "public" ? "active" : ""} onClick={() => setFilter("public")}><span className="public-dot" /> <strong>{publicCount}</strong><small>{t("publicUsers")}</small></button>
      </div>

      <section className="map-workspace">
        <aside className="location-list">
          <div className="location-list-title"><strong>{t("trackedLocations")}</strong><span>{visibleLocations.length}</span></div>
          <div className="location-scroll">
            {visibleLocations.map((location) => (
              <button type="button" key={location.id} onClick={() => focusLocation(location)}>
                <span className={`location-role-icon ${location.role}`}>{location.role === "worker" ? "W" : "U"}</span>
                <span className="location-copy"><strong>{location.name}</strong><small>{location.status}</small><em>{location.updated}</em></span>
                <span className="location-arrow" aria-hidden="true">›</span>
              </button>
            ))}
          </div>
          <p className="map-demo-note">{t("demoLocationNote")}</p>
        </aside>
        <div className="map-canvas-wrap">
          {!mapboxToken || mapError ? (
            <div className="map-config-message" role="alert">
              <strong>Mapbox setup needed</strong>
              <span>{mapError || mapboxSetupMessage}</span>
            </div>
          ) : null}
          <div ref={mapElement} className="map-canvas" aria-label={`${t("locationMap")} — Bellare, Sullia`} />
          <div className="map-place-label">Bellare village · Sullia taluk</div>
          <div className="map-legend"><span><i className="worker-dot" /> {t("workers")}</span><span><i className="public-dot" /> {t("publicUsers")}</span></div>
        </div>
      </section>
    </main>
  );
}

export default LocationMap;
