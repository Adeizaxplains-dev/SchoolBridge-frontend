// src/components/school-setup/SetupModulesGrid.jsx

import PropTypes from "prop-types";
import SetupModuleCard from "./SetupModuleCard";

export default function SetupModulesGrid({
    modules = [],
    onNavigate,
    className = "",
}) {
    if (!modules.length) {
        return null;
    }

    return (
        <section className={className}>
            {/* Header */}

            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    School Setup Modules
                </h2>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Configure your school's master data before using operational
                    modules.
                </p>
            </div>

            {/* Grid */}

            <div
                className="
                    grid
                    gap-6
                    sm:grid-cols-2
                    xl:grid-cols-3
                    2xl:grid-cols-4
                "
            >
                {modules.map((module) => (
                    <SetupModuleCard
                        key={module.key}
                        title={module.title}
                        description={module.description}
                        icon={module.icon}
                        completed={module.completed}
                        badge={module.badge}
                        loading={module.loading}
                        disabled={module.disabled}
                        onClick={() =>
                            onNavigate?.(module.route)
                        }
                    />
                ))}
            </div>
        </section>
    );
}

SetupModulesGrid.propTypes = {
    modules: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string,
            icon: PropTypes.elementType,
            completed: PropTypes.bool,
            badge: PropTypes.node,
            loading: PropTypes.bool,
            disabled: PropTypes.bool,
            route: PropTypes.string,
        })
    ),

    onNavigate: PropTypes.func,

    className: PropTypes.string,
};