import { CommitteeDetails } from "@/utils/constants/committee";
import { FadeIn } from "react-slide-fade-in";

const Committee = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 font-hollirood tracking-wider lg:gap-12">
      {CommitteeDetails.map((item, index) => {
        return (
          <div
            key={index}
            className="flex flex-col items-center gap-3 px-5 lg:gap-5"
          >
            <FadeIn
              from="bottom"
              positionOffset={200}
              triggerOffset={0}
              delayInMilliseconds={80 + index}
            >
              <h1 className="text-primary text-center text-lg font-semibold tracking-wider lg:text-2xl">
                {item.title}
              </h1>
              <div className="flex flex-row flex-wrap items-center justify-center gap-8 lg:gap-20">
                {item.members.map((member, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-row flex-wrap items-center gap-2 text-sm lg:text-lg"
                    >
                      <div className="flex flex-col items-center text-center">
                        <p className="font-semibold">{member.name}</p>
                        <p>{member.role}</p>
                        <a
                          href={`tel:${member.phone}`}
                          className="font-semibold hover:text-green-400"
                        >
                          {member.phone}
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </FadeIn>
          </div>
        );
      })}
    </div>
  );
};

export default Committee;
