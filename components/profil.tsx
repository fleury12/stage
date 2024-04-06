import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IoCalendarNumber } from "react-icons/io5";
import { Badge } from "@/components/ui/badge";
import UserData from "@/lib/type";

export const Profil = ({
  id,
  firstName,
  lastName,
  description,
  arrivalDate,
  house,
  assignment,
  isTeacher,
}: UserData) => {
  let badgeColorClass = "";
  let badgeText = house;
  if (isTeacher && assignment) {
    badgeText = assignment;
  }
  switch (house) {
    case "Gryffindor":
      badgeColorClass = "bg-red-500";
      break;
    case "Hufflepuff":
      badgeColorClass = "bg-yellow-500";
      break;
    case "Ravenclaw":
      badgeColorClass = "bg-blue-500";
      break;
    case "Slytherin":
      badgeColorClass = "bg-green-500";
      break;
    default:
      badgeColorClass = "bg-gray-500";
      break;
  }
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-center w-full">
          <div className="flex flex-col sm:flex-row items-center w-full">
            <div>
              <CardTitle className="text-3xs font-bold mb-2 sm:mb-0">
                {firstName} {lastName}
              </CardTitle>
            </div>
            <div className="sm:ml-8 flex-grow">
              {" "}
              <div className="flex justify-end w-full">
                <Badge
                  className={`text-white text-xs mr ${badgeColorClass}`}
                  variant="outline"
                >
                  {badgeText}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="mr-8 text-2xs">
        <p>{description}</p>
      </CardContent>
      <CardFooter className="text-xs">
        <IoCalendarNumber />
        <p>{arrivalDate}</p>
      </CardFooter>
    </Card>
  );
};
