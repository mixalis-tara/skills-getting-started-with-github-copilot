document.addEventListener("DOMContentLoaded", () => {
  const activitiesList = document.getElementById("activities-list");
  const activitySelect = document.getElementById("activity");
  const signupForm = document.getElementById("signup-form");
  const messageDiv = document.getElementById("message");

  // Sample activities data with participants
  const activities = [
    {
      id: 1,
      name: "Chess Club",
      description: "Learn and play chess with your peers",
      participants: ["john.doe@mergington.edu", "alice.smith@mergington.edu"],
    },
    {
      id: 2,
      name: "Debate Team",
      description: "Develop public speaking and argumentation skills",
      participants: ["emma.jones@mergington.edu"],
    },
    {
      id: 3,
      name: "Science Club",
      description: "Explore scientific experiments and discoveries",
      participants: [],
    },
  ];

  // Function to render activity cards
  function renderActivities() {
    activitiesList.innerHTML = "";

    activities.forEach((activity) => {
      const card = document.createElement("div");
      card.className = "activity-card";

      const participantsList =
        activity.participants.length > 0
          ? activity.participants.map((email) => `<li>${email}</li>`).join("")
          : "<li>No participants yet</li>";

      card.innerHTML = `
            <h4>${activity.name}</h4>
            <p>${activity.description}</p>
            <div class="participants">
                <h5>Participants:</h5>
                <ul>
                    ${participantsList}
                </ul>
            </div>
        `;

      activitiesList.appendChild(card);
    });

    updateActivitySelect();
  }

  function updateActivitySelect() {
    activitySelect.innerHTML = '<option value="">-- Select an activity --</option>';
    activities.forEach((activity) => {
      activitySelect.innerHTML += `<option value="${activity.id}">${activity.name}</option>`;
    });
  }

  // Handle form submission
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const activityId = parseInt(document.getElementById("activity").value);
    const message = document.getElementById("message");

    // Find the activity and add the participant
    const activity = activities.find((a) => a.id === activityId);
    if (activity) {
      if (!activity.participants.includes(email)) {
        activity.participants.push(email);
        message.textContent = "Successfully signed up!";
        message.className = "message success";
        renderActivities(); // Update the display
      } else {
        message.textContent = "You are already signed up for this activity!";
        message.className = "message error";
      }
    }

    message.classList.remove("hidden");
    this.reset();
  });

  // Initial render
  renderActivities();
});
