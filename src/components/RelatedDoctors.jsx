import React, { useEffect, useState } from 'react'
import TopDoctorCard from './TopDoctorCard'

const RelatedDoctors = ({speciality,doctors}) => {
    const [relatedDoctor,setRelatedDoctor] = useState()


    function filterDoctor(){
        setRelatedDoctor(doctors.filter(doc=>doc.speciality ===speciality))
    }
    
    useEffect(() => {
      filterDoctor();    
    }, []);
  return (
    <div className="flex flex-col items-center gap-5 mt-20 ">
      <div>
        <p className="text-xl text-center">Related Doctors</p>
        <p className="text-gray-600 text-sm">
          Simply browse through our extensive list of trusted doctors.
        </p>
      </div>
      <div className="flex gap-5 flex-wrap justify-evenly md:mx-16">
        {relatedDoctor && relatedDoctor.map((doctor) => (
          <div  key={doctor._id} >
          <TopDoctorCard
            image={doctor.image}
            speciality={doctor.speciality}
            name={doctor.name}
            id={doctor._id}
            
          />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RelatedDoctors
