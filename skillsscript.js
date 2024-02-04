document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.skill-section');
    const button = document.getElementById('scrollButton');

    let currentSectionIndex = 0;

    button.addEventListener('click', function() {
        currentSectionIndex++;
        if (currentSectionIndex >= sections.length) {
            currentSectionIndex = 0;
        }
        sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
    });
});

function openLink(url) {
    window.location.href = url;
  }

