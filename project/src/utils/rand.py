class ProjectAllocation:
    def __init__(self, score_list):
        self.score_list = score_list
        self.index = 0

    def __iter__(self):
        return self

    def __next__(self):
        if self.index < len(self.score_list):
            employee_id, scores = self.score_list[self.index]
            average_score = sum(scores) / len(scores)
            self.index += 1
            return {employee_id: round(average_score, 1)}
        else:
            raise StopIteration


# Main code to accept inputs
num_employees = int(input("Enter the number of employees: "))
score_list = []

for _ in range(num_employees):
    employee_id = input("Enter the employee id: ")
    scores = list(map(int, input("Enter the scores of 5 assessments (comma separated): ").split(',')))
    score_list.append([employee_id, scores])

# Creating the iterator object
allocation = ProjectAllocation(score_list)

print("Employees average scores:")
for result in allocation:
    print(result)
