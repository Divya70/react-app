import { useState } from "react";

const Form = () => {
  const ClassData = ["5th", "6th", "7th", "8th"];

  const classSectionData = {
    "5th": ["A", "B"],
    "6th": ["C", "D"],
    "7th": ["A", "C"],
    "8th": ["B", "D"],
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [rollNumberSequence, setRollNumberSequence] = useState({}); // Tracks roll numbers
  const [availableSections, setAvailableSections] = useState([]);
  const [getFormData, setGetFormData] = useState([]);

  console.log(getFormData);

  const handleClassChange = (e) => {
    const selectedClass = e.target.value;
    setClassName(selectedClass);
    setAvailableSections(classSectionData[selectedClass] || []);
    setSection("");
    setRollNo("");
  };

  const handleSectionChange = (e) => {
    const selectedSection = e.target.value;
    setSection(selectedSection);

    if (className && selectedSection) {
      const sequenceKey = `${className}-${selectedSection}`;
      const newRollNumber = rollNumberSequence[sequenceKey] || 1;
      setRollNo(`${className}-${selectedSection}-${newRollNumber}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!className || !section) {
      alert("Please select a class and section.");
      return;
    }
    setGetFormData((prevData) => [
      { firstName, lastName, dob, className, section, rollNo },
      ...prevData,
    ]);

    // Increment roll number sequence for the selected class and section
    const sequenceKey = `${className}-${section}`;
    setRollNumberSequence((prevSequence) => ({
      ...prevSequence,
      [sequenceKey]: (prevSequence[sequenceKey] || 1) + 1,
    }));

    setFirstName("");
    setLastName("");
    setDob("");
    setClassName("");
    setSection("");
    setRollNo("");
  };

  // Logic for search
  const handleSearchChange = (e) => {
    const searchRollNo = e.target.value;
    const filteredData = getFormData.filter((item) =>
      item.rollNo.toLowerCase().includes(searchRollNo.toLowerCase())
    );
    setGetFormData(filteredData);
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search by Roll Number"
          value={rollNo}
          onChange={handleSearchChange}
        />
      </div>
      {getFormData?.length > 0 &&
        getFormData?.map((FormData, index) => {
          return (
            <div key={index}>
              {`Name: ${FormData.firstName} ${FormData.lastName}, DOB: ${FormData.dob}, Class: ${FormData.className}, Section: ${FormData.section}, Roll No: ${FormData.rollNo}`}
            </div>
          );
        })}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="date"
          placeholder="DOB"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <select
          placeholder="Class"
          value={className}
          onChange={handleClassChange}
        >
          <option value="">Select Class</option>
          {ClassData.map((data, i) => (
            <option key={i} value={data}>
              {data}
            </option>
          ))}
        </select>
        <select
          placeholder="Section"
          value={section}
          onChange={handleSectionChange}
          disabled={!availableSections.length}
        >
          <option value="">Select Section</option>
          {availableSections.map((sec, i) => (
            <option key={i} value={sec}>
              {sec}
            </option>
          ))}
        </select>
        <input placeholder="Roll Number" type="text" value={rollNo} />
        <button type="submit">Add New</button>
      </form>
    </>
  );
};

export default Form;
