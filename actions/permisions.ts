
export async function canEditGrades(staffId: string): Promise<boolean> {
  // Mock implementation - replace with actual database check
  return staffId === "1" || staffId === "2"; // Assuming staff 1 and 2 can edit grades
}

export async function getEditableSubjects(staffId: string): Promise<string[]> {
  // Mock implementation - replace with actual database check
  if (staffId === "1") {
    return ["Math", "Science"]; // Mr. Anderson can edit Math and Science
  } else if (staffId === "2") {
    return ["English", "History", "Math", "Science"]; // Ms. Thompson can edit all subjects
  }
  return [];
}
