import {
    BookOpen,
    Trophy,
    TrendingDown,
    CheckCircle2,
    XCircle,
    Award,
} from "lucide-react";

export default function ResultStatistics({
    subjects = [],
}) {

    const totalSubjects = subjects.length;

    const passed = subjects.filter(
        s => Number(s.total) >= 40
    ).length;

    const failed = totalSubjects - passed;

    const highest =
        totalSubjects > 0
            ? Math.max(...subjects.map(s => Number(s.total)))
            : 0;

    const lowest =
        totalSubjects > 0
            ? Math.min(...subjects.map(s => Number(s.total)))
            : 0;

    const gradePoint = {

        A:5,
        B:4,
        C:3,
        D:2,
        E:1,
        F:0,

    };

    const avgGradePoint =
        totalSubjects > 0
            ? subjects.reduce(
                (sum,s)=>sum+(gradePoint[s.grade]||0),
                0
            )/totalSubjects
            :0;

    const averageGrade =
        avgGradePoint >=4.5 ? "A" :
        avgGradePoint >=3.5 ? "B" :
        avgGradePoint >=2.5 ? "C" :
        avgGradePoint >=1.5 ? "D" :
        avgGradePoint >=0.5 ? "E" :
        "F";

    const cards = [

        {
            title:"Subjects",
            value:totalSubjects,
            icon:BookOpen,
            color:"bg-blue-100 text-blue-600",
        },

        {
            title:"Passed",
            value:passed,
            icon:CheckCircle2,
            color:"bg-green-100 text-green-600",
        },

        {
            title:"Failed",
            value:failed,
            icon:XCircle,
            color:"bg-red-100 text-red-600",
        },

        {
            title:"Highest",
            value:highest,
            icon:Trophy,
            color:"bg-yellow-100 text-yellow-700",
        },

        {
            title:"Lowest",
            value:lowest,
            icon:TrendingDown,
            color:"bg-orange-100 text-orange-700",
        },

        {
            title:"Avg Grade",
            value:averageGrade,
            icon:Award,
            color:"bg-purple-100 text-purple-600",
        },

    ];

    return (

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5">

            {cards.map((card,index)=>{

                const Icon=card.icon;

                return(

                    <div
                        key={index}
                        className="bg-white rounded-xl shadow p-5 flex items-center justify-between"
                    >

                        <div>

                            <div className="text-gray-500 text-sm">
                                {card.title}
                            </div>

                            <div className="text-3xl font-bold mt-2">
                                {card.value}
                            </div>

                        </div>

                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${card.color}`}>

                            <Icon size={26}/>

                        </div>

                    </div>

                );

            })}

        </div>

    );

}