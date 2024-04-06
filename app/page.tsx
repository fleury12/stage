"use client";
import React from "react";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import { Profil } from "@/components/profil";
import UserData from "@/lib/type";
import { useState, useEffect } from "react";
import fichier_json from "@/public/files/profils.json";

export default function Home() {
  const users: UserData[] = fichier_json;
  console.log(users);
  const compareArrivalDate = (a: UserData, b: UserData) => {
    const dateA = new Date(a.arrivalDate);
    const dateB = new Date(b.arrivalDate);
    return dateA.getTime() - dateB.getTime();
  };

  const teachers = users.filter((user) => user.isTeacher);
  teachers.sort(compareArrivalDate);

  const studentsByHouse: { [key: string]: UserData[] } = {};
  users
    .filter((user) => !user.isTeacher)
    .sort((a, b) => a.firstName.localeCompare(b.firstName))
    .forEach((student) => {
      if (!studentsByHouse[student.house]) {
        studentsByHouse[student.house] = [];
      }
      studentsByHouse[student.house].push(student);
    });
  const houses = Object.keys(studentsByHouse).reverse();

  return (
    <div className="m-10 ">
      <div>
        <Image
          src={logo}
          alt="logo de l'entreprise"
          width={130}
          height={130}
          priority
        />
      </div>
      <div className="flex flex-col md:flex-row mt-8">
        <div className="md:w-1/3 px-4 ">
          <div className="font-bold text-xl"> Teachers </div>
          <div className="mt-8">
            {teachers.map((teacher) => (
              <div key={teacher.id} className="mb-4">
                <Profil
                  firstName={teacher.firstName}
                  lastName={teacher.lastName}
                  description={teacher.description}
                  arrivalDate={teacher.arrivalDate}
                  house={teacher.house}
                  assignment={teacher.assignment}
                  isTeacher={teacher.isTeacher}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="md:w-2/3 px-4 ">
          <div className="font-bold text-xl"> Students </div>
          <div className="mt-8">
            {houses.map((house) => (
              <div key={house}>
                <div className="flex flex-wrap">
                  {studentsByHouse[house].map((student) => (
                    <div key={student.id} className="sm:w-1/2 pr-4 mb-4">
                      <Profil
                        key={student.id}
                        firstName={student.firstName}
                        lastName={student.lastName}
                        description={student.description}
                        arrivalDate={student.arrivalDate}
                        house={student.house}
                        assignment={student.assignment}
                        isTeacher={student.isTeacher}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
