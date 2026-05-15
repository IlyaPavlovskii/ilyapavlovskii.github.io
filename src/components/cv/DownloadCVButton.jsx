import React, { useState } from "react";

export default function DownloadCVButton({ data }) {
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const [{ pdf }, { default: CVDocument }] = await Promise.all([
                import("@react-pdf/renderer"),
                import("./CVDocument.jsx"),
            ]);
            const blob = await pdf(<CVDocument data={data} />).toBlob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = data.pdfFileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        } catch (err) {
            console.error("Failed to generate CV PDF", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={loading}
            aria-busy={loading}
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-200 text-base font-semibold disabled:opacity-60 disabled:cursor-wait"
            style={{ color: "#6366f1", border: "1px solid rgba(99,102,241,0.2)" }}
        >
            {loading ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                    <path
                        d="M4 12a8 8 0 018-8"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        fill="none"
                    />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"
                    />
                </svg>
            )}
            {data.downloadButton}
        </button>
    );
}
