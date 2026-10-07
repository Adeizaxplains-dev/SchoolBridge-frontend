export default function SubjectBreakdownTable({
    subjects = [],
}) {

    const gradeColor = (grade) => {

        switch (grade) {

            case "A":
                return "bg-green-100 text-green-700";

            case "B":
                return "bg-blue-100 text-blue-700";

            case "C":
                return "bg-yellow-100 text-yellow-700";

            case "D":
                return "bg-orange-100 text-orange-700";

            default:
                return "bg-red-100 text-red-700";
        }

    };

    const scoreColor = (score) => {

        if (score >= 80)
            return "text-green-600";

        if (score >= 70)
            return "text-blue-600";

        if (score >= 60)
            return "text-yellow-600";

        return "text-red-600";

    };

    return (

        <div className="bg-white rounded-xl shadow overflow-hidden">

            <div className="px-6 py-5 border-b">

                <h2 className="text-lg font-bold">
                    Academic Performance
                </h2>

            </div>

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-gray-50">

                        <tr>

                            <th className="text-left p-4">
                                Subject
                            </th>

                            <th>CA1</th>

                            <th>CA2</th>

                            <th>CA3</th>

                            <th>Exam</th>

                            <th>Total</th>

                            <th>Grade</th>

                            <th>Remark</th>

                            <th>Teacher Comment</th>

                        </tr>

                    </thead>

                    <tbody>

                        {subjects.map((subject,index)=>(

                            <tr
                                key={index}
                                className="border-t hover:bg-gray-50 transition"
                            >

                                <td className="p-4 font-medium">
                                    {subject.subject}
                                </td>

                                <td className="text-center">
                                    {subject.ca1}
                                </td>

                                <td className="text-center">
                                    {subject.ca2}
                                </td>

                                <td className="text-center">
                                    {subject.ca3}
                                </td>

                                <td className="text-center">
                                    {subject.exam}
                                </td>

                                <td
                                    className={`text-center font-bold ${scoreColor(subject.total)}`}
                                >
                                    {subject.total}
                                </td>

                                <td className="text-center">

                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${gradeColor(subject.grade)}`}
                                    >
                                        {subject.grade}
                                    </span>

                                </td>

                                <td className="text-center">
                                    {subject.remark}
                                </td>

                                <td className="text-left px-4">
                                    {subject.teacherComment}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}