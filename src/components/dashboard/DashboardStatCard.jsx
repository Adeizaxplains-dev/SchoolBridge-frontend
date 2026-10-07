import { motion } from "framer-motion";

/*
========================================
DASHBOARD STAT CARD (SAAS COMPONENT)
========================================
Reusable analytics card used in:
- Result Dashboard
- Admin Dashboard
- Analytics panels
*/

export default function DashboardStatCard({
    title,
    value,
    icon: Icon,
    color = "blue",
    subtitle,
    trend,
    onClick,
}) {

    const colorMap = {
        blue: {
            bg: "bg-blue-50",
            text: "text-blue-700",
            icon: "text-blue-600",
            border: "border-blue-100",
        },
        green: {
            bg: "bg-green-50",
            text: "text-green-700",
            icon: "text-green-600",
            border: "border-green-100",
        },
        yellow: {
            bg: "bg-yellow-50",
            text: "text-yellow-700",
            icon: "text-yellow-600",
            border: "border-yellow-100",
        },
        red: {
            bg: "bg-red-50",
            text: "text-red-700",
            icon: "text-red-600",
            border: "border-red-100",
        },
        gray: {
            bg: "bg-gray-50",
            text: "text-gray-700",
            icon: "text-gray-600",
            border: "border-gray-100",
        },
    };

    const theme = colorMap[color] || colorMap.blue;

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={onClick}
            className={`
                ${theme.bg}
                ${theme.border}
                border
                rounded-2xl
                p-5
                shadow-sm
                cursor-pointer
                hover:shadow-md
                transition
            `}
        >

            <div className="flex items-center justify-between">

                {/* TEXT SECTION */}
                <div>

                    <p className="text-sm text-gray-500">
                        {title}
                    </p>

                    <h2 className={`text-2xl font-bold ${theme.text}`}>
                        {value}
                    </h2>

                    {subtitle && (
                        <p className="text-xs text-gray-400 mt-1">
                            {subtitle}
                        </p>
                    )}

                    {/* TREND (OPTIONAL) */}
                    {trend && (
                        <p className={`text-xs mt-1 font-medium ${
                            trend > 0
                                ? "text-green-600"
                                : "text-red-600"
                        }`}>
                            {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
                        </p>
                    )}

                </div>

                {/* ICON */}
                {Icon && (
                    <div className={`${theme.icon}`}>
                        <Icon size={26} />
                    </div>
                )}

            </div>

        </motion.div>
    );
}