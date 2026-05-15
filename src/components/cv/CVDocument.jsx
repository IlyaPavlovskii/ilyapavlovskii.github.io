import React from "react";
import {
    Document,
    Page,
    Text,
    View,
    Link,
    StyleSheet,
    Font,
} from "@react-pdf/renderer";

Font.register({
    family: "Roboto",
    fonts: [
        { src: "/fonts/Roboto-Regular.ttf", fontWeight: 400 },
        { src: "/fonts/Roboto-Bold.ttf", fontWeight: 700 },
    ],
});

const ACCENT = "#6366f1";
const TEXT = "#1f2937";
const MUTED = "#6b7280";
const BORDER = "#e5e7eb";

const styles = StyleSheet.create({
    page: {
        paddingTop: 32,
        paddingBottom: 32,
        paddingHorizontal: 36,
        fontFamily: "Roboto",
        fontSize: 9.5,
        lineHeight: 1.45,
        color: TEXT,
    },
    headerName: {
        fontSize: 22,
        fontWeight: 700,
        color: ACCENT,
        marginBottom: 4,
    },
    contactRow: {
        marginBottom: 10,
        fontSize: 9.5,
        color: TEXT,
        lineHeight: 1.4,
    },
    contactSeparator: {
        color: MUTED,
    },
    intro: {
        marginTop: 6,
        marginBottom: 14,
        fontSize: 9.5,
        color: TEXT,
        lineHeight: 1.5,
    },
    introParagraph: {
        marginBottom: 4,
    },
    link: {
        color: ACCENT,
        textDecoration: "none",
    },
    sectionHeader: {
        fontSize: 12,
        fontWeight: 700,
        color: ACCENT,
        textTransform: "uppercase",
        letterSpacing: 1.2,
        marginTop: 10,
        marginBottom: 6,
        paddingBottom: 3,
        borderBottom: `0.5pt solid ${BORDER}`,
    },
    item: {
        marginBottom: 10,
        paddingLeft: 8,
        borderLeft: `2pt solid ${BORDER}`,
    },
    itemHeaderRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
        marginBottom: 1,
    },
    itemCompany: {
        fontSize: 10.5,
        fontWeight: 700,
    },
    itemMeta: {
        fontSize: 8.5,
        color: MUTED,
    },
    itemTitle: {
        fontSize: 9.5,
        fontWeight: 700,
        color: TEXT,
        marginBottom: 2,
    },
    itemDesc: {
        fontSize: 9,
        color: TEXT,
        marginTop: 2,
        marginBottom: 3,
    },
    bullet: {
        flexDirection: "row",
        marginTop: 1.5,
        marginLeft: 4,
    },
    bulletDot: {
        width: 8,
        fontSize: 9,
        color: ACCENT,
    },
    bulletText: {
        flex: 1,
        fontSize: 8.5,
        color: TEXT,
        lineHeight: 1.4,
    },
    certList: {
        marginTop: 2,
    },
    certItem: {
        fontSize: 9.5,
        marginBottom: 2,
        marginLeft: 4,
    },
    skillsWrap: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 2,
    },
    skillChip: {
        backgroundColor: "#eef2ff",
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 6,
        paddingRight: 6,
        borderRadius: 3,
        marginRight: 4,
        marginBottom: 4,
    },
    skillChipText: {
        fontSize: 8.5,
        color: ACCENT,
    },
});

const itemAccent = (color) =>
    color ? { borderLeft: `2pt solid ${color}` } : {};

const IntroParagraph = ({ paragraph }) => (
    <Text style={styles.introParagraph}>
        {paragraph.map((seg, i) =>
            typeof seg === "string" ? (
                <Text key={i}>{seg}</Text>
            ) : (
                <Link key={i} src={seg.href} style={styles.link}>
                    {seg.text}
                </Link>
            )
        )}
    </Text>
);

const TimelineItem = ({ item }) => (
    <View style={[styles.item, itemAccent(item.color)]} wrap={false}>
        <View style={styles.itemHeaderRow}>
            {item.company ? (
                item.companyLink ? (
                    <Link
                        src={item.companyLink}
                        style={[styles.itemCompany, { color: item.color || ACCENT, textDecoration: "none" }]}
                    >
                        {item.company}
                    </Link>
                ) : (
                    <Text style={[styles.itemCompany, { color: item.color || ACCENT }]}>
                        {item.company}
                    </Text>
                )
            ) : (
                <Text />
            )}
            <Text style={styles.itemMeta}>
                {[item.date, item.location].filter(Boolean).join("  •  ")}
            </Text>
        </View>
        {item.title && <Text style={styles.itemTitle}>{item.title}</Text>}
        {item.desc && <Text style={styles.itemDesc}>{item.desc}</Text>}
        {item.achievements?.map((a, i) => (
            <View key={i} style={styles.bullet}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>{a}</Text>
            </View>
        ))}
    </View>
);

export default function CVDocument({ data }) {
    return (
        <Document
            title={`Ilia Pavlovskii — CV (${data.lang.toUpperCase()})`}
            author="Ilia Pavlovskii"
        >
            <Page size="A4" style={styles.page}>
                <Text style={styles.headerName}>Ilia Pavlovskii</Text>

                <View style={styles.intro}>
                    {data.intro.map((p, i) => (
                        <IntroParagraph key={i} paragraph={p} />
                    ))}
                </View>

                <Text style={styles.contactRow}>
                    {data.contact.map((c, i) => {
                        const display =
                            c.type === "email"
                                ? c.href.replace(/^mailto:/, "")
                                : c.href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
                        return (
                            <Text key={i}>
                                {i > 0 && <Text style={styles.contactSeparator}>{"  ·  "}</Text>}
                                <Text>{display}</Text>
                            </Text>
                        );
                    })}
                </Text>

                <Text style={styles.sectionHeader}>{data.sectionHeaders.education}</Text>
                {data.education.map((item, i) => (
                    <TimelineItem key={i} item={item} />
                ))}

                <Text style={styles.sectionHeader}>{data.sectionHeaders.experience}</Text>
                {data.experience.map((item, i) => (
                    <TimelineItem key={i} item={item} />
                ))}

                <Text style={styles.sectionHeader}>{data.sectionHeaders.projects}</Text>
                {data.projects.map((item, i) => (
                    <TimelineItem key={i} item={item} />
                ))}

                <Text style={styles.sectionHeader}>{data.sectionHeaders.certifications}</Text>
                <View style={styles.certList}>
                    {data.certifications.map((c, i) => (
                        <Text key={i} style={styles.certItem}>
                            {"• "}
                            {c.href ? (
                                <Link src={c.href} style={styles.link}>
                                    {c.label}
                                </Link>
                            ) : (
                                c.label
                            )}
                        </Text>
                    ))}
                </View>

                <Text style={styles.sectionHeader}>{data.sectionHeaders.events}</Text>
                {data.events.map((item, i) => (
                    <TimelineItem key={i} item={item} />
                ))}

                <Text style={styles.sectionHeader}>{data.sectionHeaders.skills}</Text>
                <View style={styles.skillsWrap}>
                    {data.skills.map((s, i) => (
                        <View key={i} style={styles.skillChip} wrap={false}>
                            <Text style={styles.skillChipText}>{s}</Text>
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );
}
