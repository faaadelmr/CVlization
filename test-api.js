// test-api.js - Simple script to test the PDF generation API
const testData = {
  resumeData: {
    personal: {
      name: "John Doe",
      role: "Software Engineer",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      website: "johndoe.com",
      description: "Experienced software engineer with a passion for creating efficient and scalable applications."
    },
    experience: [
      {
        company: "Tech Corp",
        role: "Senior Developer",
        date: "2020 - Present",
        description: "Developed and maintained web applications using React and Node.js. Led a team of 5 developers."
      }
    ],
    education: [
      {
        institution: "University of Technology",
        degree: "Bachelor of Science in Computer Science",
        date: "2016 - 2020",
        description: "Graduated with honors. Specialized in software engineering."
      }
    ],
    projects: [
      {
        name: "E-commerce Platform",
        description: "A full-stack e-commerce solution with payment integration.",
        technologies: "React, Node.js, MongoDB",
        link: "https://github.com/johndoe/ecommerce"
      }
    ],
    skills: "JavaScript, TypeScript, React, Node.js, Python, SQL"
  },
  template: "modern",
  color: "#1f2937",
  bgColor: "#ffffff",
  textColor: "#000000",
  font: "Inter",
  fileName: "test-resume.pdf"
};

// Create a test HTML page to verify the API endpoint
const testPage = `
<!DOCTYPE html>
<html>
<head>
    <title>PDF Generation Test</title>
</head>
<body>
    <h1>PDF Generation Test</h1>
    <p>This page tests the PDF generation API endpoint.</p>
    <button id="testButton">Generate Test PDF</button>

    <script>
        document.getElementById('testButton').addEventListener('click', async () => {
            try {
                const response = await fetch('/api/generate-pdf', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(${JSON.stringify(testData)})
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                // Create a blob from the response
                const blob = await response.blob();
                
                // Create a temporary URL for the blob
                const url = window.URL.createObjectURL(blob);
                
                // Create a temporary link element to trigger the download
                const link = document.createElement('a');
                link.href = url;
                link.download = '${testData.fileName}';
                
                // Trigger the download
                document.body.appendChild(link);
                link.click();
                
                // Clean up
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
                
                console.log('PDF generated successfully!');
            } catch (error) {
                console.error('Error generating PDF:', error);
                alert('Error generating PDF: ' + error.message);
            }
        });
    </script>
</body>
</html>
`;

// Write the test page to a file
const fs = require('fs');
fs.writeFileSync('./src/app/test-pdf/page.tsx', 
`// This is a test page for PDF generation
import fs from 'fs';

export default function TestPdfPage() {
  return (
    <div dangerouslySetInnerHTML={{__html: \`
      ${testPage.replace('</script>', '\\\\</script>')}
    \`}} />
  );
}
`);

console.log('Test page created at src/app/test-pdf/page.tsx');
console.log('Visit http://localhost:9002/test-pdf to test the PDF generation');