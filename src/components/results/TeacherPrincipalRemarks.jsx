import {
    UserCheck,
    GraduationCap,
    CalendarDays,
} from "lucide-react";

export default function TeacherPrincipalRemarks({
    result,
}) {

    return (

        <div className="grid md:grid-cols-2 gap-6">

            {/* Teacher */}

            <div className="bg-white rounded-xl shadow overflow-hidden">

                <div className="bg-blue-600 text-white px-5 py-4 flex items-center gap-3">

                    <UserCheck size={22} />

                    <h2 className="font-semibold">
                        Teacher Assessment
                    </h2>

                </div>

                <div className="p-6">

                    <p className="text-gray-700 leading-7 min-h-[120px]">

                        {result.teacherRemark ||
                            "No teacher remark available."}

                    </p>

                    <div className="border-t mt-6 pt-4">

                        <div className="text-sm text-gray-500">
                            Submitted By
                        </div>

                        <div className="font-semibold mt-1">
                            {result.teacherName ||
                                "Class Teacher"}
                        </div>

                        {result.updatedAt && (

                            <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">

                                <CalendarDays size={15} />

                                {new Date(
                                    result.updatedAt
                                ).toLocaleDateString()}

                            </div>

                        )}

                    </div>

                </div>

            </div>

            {/* Principal */}

            <div className="bg-white rounded-xl shadow overflow-hidden">

                <div className="bg-green-600 text-white px-5 py-4 flex items-center gap-3">

                    <GraduationCap size={22} />

                    <h2 className="font-semibold">
                        Principal's Decision
                    </h2>

                </div>

                <div className="p-6">

                    <p className="text-gray-700 leading-7 min-h-[120px]">

                        {result.principalRemark ||
                            "No principal remark available."}

                    </p>

                    <div className="border-t mt-6 pt-4">

                        <div className="text-sm text-gray-500">
                            Approved By
                        </div>

                        <div className="font-semibold mt-1">
                            {result.principalName ||
                                "Principal"}
                        </div>

                        {result.publishedAt && (

                            <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">

                                <CalendarDays size={15} />

                                {new Date(
                                    result.publishedAt
                                ).toLocaleDateString()}

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </div>

    );

}