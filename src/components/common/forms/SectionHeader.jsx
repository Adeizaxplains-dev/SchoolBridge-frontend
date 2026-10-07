export default function SectionHeader({

  icon: Icon,

  title,

  description,

  badge,

  action,

  className = "",

}) {

  return (

    <div
      className={`
        flex
        items-start
        justify-between
        gap-4
        border-b
        border-slate-100
        p-6
        ${className}
      `}
    >

      <div
        className="
        flex
        items-center
        gap-4
        "
      >


        {Icon && (

          <div
            className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-blue-100
            text-blue-600
            "
          >

            <Icon size={22}/>

          </div>

        )}





        <div>


          <div
            className="
            flex
            items-center
            gap-2
            "
          >

            <h2
              className="
              text-xl
              font-bold
              text-slate-900
              "
            >

              {title}

            </h2>



            {badge && (

              <span
                className="
                rounded-full
                bg-blue-100
                px-3
                py-1
                text-xs
                font-semibold
                text-blue-700
                "
              >

                {badge}

              </span>

            )}


          </div>





          {description && (

            <p
              className="
              mt-1
              text-sm
              text-slate-500
              "
            >

              {description}

            </p>

          )}



        </div>


      </div>





      {action && (

        <div>

          {action}

        </div>

      )}



    </div>

  );

}