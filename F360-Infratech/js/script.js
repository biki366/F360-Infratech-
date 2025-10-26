// --- Engineers Sample Data (ID added for Dynamic Profile Loading) ---
const engineersData = [
    { id: 1, name: "Er. Rohit Sharma", rating: "4.8", specialty: "Residential & Layout Design", location: "Mumbai, MH", experience: "8 Years | 15+ Projects Done", profilePic: "images/profile-rohit.jpg", expYears: "5-10", about: "Rohit Sharma Mumbai ke sabse bharosemand engineers mein se hain. Unhone 15 se zyada residential projects successfully complete kiye hain. Woh structural integrity aur modern layout designs mein expert hain." },
    { id: 2, name: "Ar. Priya Singh", rating: "4.9", specialty: "Interior Design & Commercial", location: "Bangalore, KA", experience: "12 Years | 25+ Projects Done", profilePic: "images/profile-priya.jpg", expYears: "10+", about: "Priya Singh Bangalore ki leading architect hain, jinki expertise Interior Design aur sustainable commercial projects mein hai. Customer satisfaction unki priority hai." },
    { id: 3, name: "Er. S. Kumar", rating: "4.5", specialty: "Structural Audit", location: "Chennai, TN", experience: "15 Years | 50+ Projects Done", profilePic: "images/profile-kumar.jpg", expYears: "10+", about: "S. Kumar structural engineering aur purane buildings ke audit mein 15 saal ka anubhav rakhte hain. Unka kaam majboot aur surakshit structures ki guarantee deta hai." },
    { id: 4, name: "Ar. Ayesha Khan", rating: "4.7", specialty: "Landscape & Sustainable Design", location: "Delhi, DL", experience: "7 Years | 10+ Projects Done", profilePic: "images/profile-ayesha.jpg", expYears: "5-10", about: "Ayesha Khan Landscape architecture aur eco-friendly designs mein mahir hain. Unhone Delhi-NCR mein bade-bade green projects successfully deliver kiye hain." },
    { id: 5, name: "Er. Vikram Yadav", rating: "4.6", specialty: "Commercial & Industrial", location: "Pune, MH", experience: "10 Years | 20+ Projects Done", profilePic: "images/profile-vikram.jpg", expYears: "5-10", about: "Vikram Yadav Commercial aur Industrial projects ke liye jaane jaate hain. Unki planning aur execution speed bahut fast hoti hai, jisse time par delivery hoti hai." },
    { id: 6, name: "Ar. Meena Devi", rating: "4.3", specialty: "Urban Planning & Residential", location: "Hyderabad, TS", experience: "6 Years | 9+ Projects Done", profilePic: "images/profile-meena.jpg", expYears: "5-10", about: "Meena Devi Urban planning aur affordable housing projects mein visheshgyata rakhti hain. Unka kaam budget friendly aur modern designs ke liye famous hai." },
    { id: 7, name: "Er. Rahul Gupta", rating: "4.2", specialty: "Building Renovation", location: "Jaipur, RJ", experience: "9 Years | 18+ Projects Done", profilePic: "images/profile-rahul.jpg", expYears: "5-10", about: "Rahul Gupta purane gharon aur buildingon ko naya roop dene mein expert hain. Renovation projects ke liye unki demand sabse zyada rehti hai." },
    { id: 8, name: "Ar. Kavita Rao", rating: "4.8", specialty: "Modern Home Design", location: "Lucknow, UP", experience: "11 Years | 22+ Projects Done", profilePic: "images/profile-kavita.jpg", expYears: "10+", about: "Kavita Rao minimalist aur modern home designs ki specialist hain. Unke designs luxurious aur comfortable hote hain." }
];

// Profile data ko global window object mein store karna taaki profile.html access kar sake
window.ENGINEER_DATA = engineersData;

function getEngineerData(id) {
    return engineersData.find(e => e.id === parseInt(id));
}

// HTML elements ko select karna (Modal Logic)
const modal = document.getElementById('loginModal');
const btn = document.querySelector('.cta-button'); 
const span = document.querySelector('.close-btn'); 

// Login/Signup view elements
const loginView = document.getElementById('loginView');
const signupView = document.getElementById('signupView');
const switchToSignupLink = document.getElementById('switchToSignup');
const roleCards = document.querySelectorAll('.role-card');

// --- MODAL LOGIC ---

if (btn) {
    btn.onclick = function() {
        modal.style.display = 'block'; 
        // Ye line ensure karti hai ki modal hamesha Login view se shuru ho
        loginView.classList.add('active-view');
        signupView.classList.remove('active-view');
    }
}

if (span) {
    span.onclick = function() {
        modal.style.display = 'none';
    }
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// --- VIEWS KO SWITCH KARNE KA LOGIC ---

function switchView(targetViewId) {
    if (targetViewId === 'signup') {
        loginView.classList.remove('active-view');
        signupView.classList.add('active-view');
    } else {
        signupView.classList.remove('active-view');
        loginView.classList.add('active-view');
    }
}

if (switchToSignupLink) {
    switchToSignupLink.onclick = function(e) {
        e.preventDefault(); 
        switchView('signup');
    }
}

// Dyanmically check for Back to Login link
document.addEventListener('click', function(e) {
    if (e.target && e.target.id === 'switchToLogin') {
        e.preventDefault(); 
        switchView('login');
    }
});


// --- ROLE-SPECIFIC FORM GENERATION LOGIC (UPDATED) ---

const formContainer = document.getElementById('signupView'); 

function getRoleSelectionHTML() {
    return `
        <h2>Join F360 Infratech</h2>
        <p>Please select your role to continue registration:</p>

        <div class="role-grid">
            <button class="role-card" data-role="owner">
                🏠 Home Owner
            </button>
            <button class="role-card" data-role="engineer">
                🧑‍💼 Engineer / Architect
            </button>
            <button class="role-card" data-role="contractor">
                👷 Contractor
            </button>
        </div>
        
        <p class="switch-form"><a href="#" id="switchToLogin">Back to Login</a></p>
    `;
}

function getRoleFormHTML(role) {
    let roleTitle = '';
    let extraFields = '';
    
    if (role === 'owner') {
        roleTitle = 'Home Owner Registration 🏠';
        extraFields = `
            <input type="text" placeholder="Full Name" required>
            <input type="tel" placeholder="Contact Number" required>
            <input type="text" placeholder="Project City/Location" required>
        `;
    } else if (role === 'engineer' || role === 'contractor') {
        roleTitle = (role === 'engineer' ? 'Engineer / Architect Signup 🧑‍💼' : 'Contractor Registration 👷');
        extraFields = `
            <input type="text" placeholder="Full Name/Company Name" required>
            <input type="tel" placeholder="Contact Number" required>
            <input type="number" placeholder="Years of Experience" required>
            <select required>
                <option value="">Select Primary Specialization</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Renovation">Renovation</option>
                <option value="Interior">Interior Design</option>
            </select>
            <input type="file" accept=".pdf,.jpg" id="kyc-upload" style="display: none;">
            <label for="kyc-upload" class="file-label">Upload Govt ID / Business Registration</label>
        `;
    } 

    return `
        <h2>${roleTitle}</h2>
        <p>Fill in the details to complete your profile on F360.</p>
        
        <form id="${role}-signup-form">
            <input type="email" placeholder="Email Address" required>
            <input type="password" placeholder="Create Password" required>
            ${extraFields}
            <button type="submit" class="primary-cta">Register</button>
        </form>
        
        <p class="switch-form"><a href="#" id="switchToRoleSelect">← Back to Role Select</a></p>
    `;
}

// Event Listener for Role Selection (Updated to load forms)
document.addEventListener('click', function(e) {
    const roleCard = e.target.closest('.role-card');
    if (roleCard && roleCard.closest('#signupView')) {
        const selectedRole = roleCard.getAttribute('data-role');
        
        // Agar Vendor chuna gaya hai (although button removed, good for safety)
        if (selectedRole === 'vendor') {
            modal.style.display = 'none';
            alert("Vendors ke liye alag B2B Portal hai.");
        } else {
            const formHTML = getRoleFormHTML(selectedRole);
            formContainer.innerHTML = formHTML; // Form load karna
        }
    }

    // Event Listener for 'Back to Role Select' button
    if (e.target && e.target.id === 'switchToRoleSelect') {
        e.preventDefault();
        formContainer.innerHTML = getRoleSelectionHTML(); // Wapas Role Grid load karna
    }

    // Event Listener for form submission (Demo)
    if (e.target && e.target.type === 'submit' && e.target.closest('form')) {
        e.preventDefault(); 
        const formId = e.target.closest('form').id;
        if(formId.includes('signup') || formId.includes('login')) {
            alert(`Registration/Login successful for ${formId.split('-')[0]}!`);
            modal.style.display = "none";
            // Yahan par actual form submission/API call hoga
        }
    }
});

// Initial setup to load Role Selection when Signup view is active
document.addEventListener('DOMContentLoaded', () => {
    // Ye line ensure karti hai ki jab page load ho, toh signup view ready ho
    if (formContainer) {
        // Clear existing static HTML and load dynamic role selector
        formContainer.innerHTML = getRoleSelectionHTML(); 
    }
});


// --- ENGINEERS PAGE SCRIPT (Load Engineer Cards & Filter Logic) ---

document.addEventListener('DOMContentLoaded', function() {
    const engineerGrid = document.querySelector('.engineer-grid');
    const countHeading = document.querySelector('.engineer-list-section h2');

    // Agar yeh ENGINEERS PAGE hai (engineerGrid exist karta hai)
    if (engineerGrid) {
        
        // Engineer Card Creation Logic (Updated to link with ID)
        function createEngineerCard(engineer) {
             const cardDiv = document.createElement('div');
             cardDiv.classList.add('engineer-card');
             cardDiv.innerHTML = `
                 <img src="${engineer.profilePic || 'images/placeholder-engineer.jpg'}" alt="${engineer.name} Profile" class="profile-pic">
                 <h3>${engineer.name} <span class="rating">⭐ ${engineer.rating}</span></h3>
                 <p class="specialty">Specializes in: <b>${engineer.specialty}</b></p>
                 <p class="location">Location: <b>${engineer.location}</b></p>
                 <p class="experience">Experience: <b>${engineer.experience}</b></p>
                 <a href="profile.html?id=${engineer.id}" class="primary-cta small-cta" style="text-decoration: none; display: block; margin-top: 15px;">View Profile</a>
             `;
             return cardDiv;
        }
        
        // Function to render the list
        function renderEngineers(filteredData) {
            engineerGrid.innerHTML = ''; 
            if (filteredData.length === 0) {
                engineerGrid.innerHTML = '<p style="text-align: center; font-size: 1.2em; color: #555;">Koi expert nahi mila. Kripya filter badle.</p>';
                countHeading.textContent = 'Showing 0 Verified Experts';
                return;
            }

            filteredData.forEach(engineer => {
                engineerGrid.appendChild(createEngineerCard(engineer));
            });
            countHeading.textContent = `Showing ${filteredData.length} Verified Experts`;
        }

        // --- Filtering Logic ---
        const searchInput = document.querySelector('.search-box input');
        const specializationFilter = document.querySelector('#specialization-filter');
        const experienceFilter = document.querySelector('#experience-filter');
        const applyFilterBtn = document.querySelector('.apply-filter-btn');

        function filterEngineers() {
            const selectedSpecialty = specializationFilter.value;
            const selectedExperience = experienceFilter.value;
            const searchTerm = searchInput.value.toLowerCase(); 

            const filtered = engineersData.filter(engineer => {
                const matchesSearch = engineer.name.toLowerCase().includes(searchTerm) ||
                                      engineer.location.toLowerCase().includes(searchTerm) ||
                                      engineer.specialty.toLowerCase().includes(searchTerm);
                
                // Match Specialty
                const matchesSpecialty = selectedSpecialty === "" || engineer.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase()); 
                
                // Match Experience
                let matchesExperience = true;
                if (selectedExperience === "1-5") {
                    matchesExperience = engineer.expYears === "1-5";
                } else if (selectedExperience === "5-10") {
                    matchesExperience = engineer.expYears === "5-10";
                } else if (selectedExperience === "10+") {
                    matchesExperience = engineer.expYears === "10+";
                }

                return matchesSearch && matchesSpecialty && matchesExperience;
            });

            renderEngineers(filtered);
        }
        
        // Event listeners ko filter function se jodna
        if (searchInput) searchInput.addEventListener('input', filterEngineers); 
        if (applyFilterBtn) applyFilterBtn.addEventListener('click', filterEngineers);
        if (specializationFilter) specializationFilter.addEventListener('change', filterEngineers);
        if (experienceFilter) experienceFilter.addEventListener('change', filterEngineers);

        // Initial load
        filterEngineers(); 

    // Agar yeh PROFILE PAGE hai
    } else if (document.querySelector('.profile-details-container')) {
        
        const params = new URLSearchParams(window.location.search);
        const engineerId = params.get('id') || '1'; // Default to ID 1 (Rohit)
        
        const engineer = getEngineerData(engineerId);

        if (engineer) {
            // Update Profile Content
            document.querySelector('.profile-large-pic').src = engineer.profilePic;
            document.querySelector('.engineer-name').textContent = engineer.name;
            document.querySelector('.engineer-title').textContent = `Verified Expert in ${engineer.specialty}`;
            document.querySelector('.rating-value').textContent = `${engineer.rating} (${Math.floor(Math.random() * 50) + 15} Reviews)`;
            document.querySelector('.about-text').textContent = engineer.about;
            
            // Update Experience List 
            const expList = document.querySelector('#tab-experience .detail-list');
            if(expList) {
                expList.innerHTML = `
                    <li>**Anubhav:** ${engineer.experience.split('|')[0].trim()}</li>
                    <li>**Visheshgyata:** ${engineer.specialty}</li>
                    <li>**Location:** ${engineer.location.split(',').join(' & ')}</li>
                    <li>**KYC Status:** Verified (F360 Infratech)</li>
                `;
            }
            document.title = `${engineer.name} - Profile | F360 Infratech`;
        } else {
            document.querySelector('.page-content').innerHTML = `<h2 style="text-align: center; padding: 100px;">Expert Not Found!</h2>`;
        }
    }
});


// =========================================================
// 3. AI Cost Estimator Logic (For index.html) - UPDATED
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
    const estimatorForm = document.getElementById('ai-estimator-form');
    const resultDiv = document.getElementById('estimate-result');

    if (estimatorForm) {
        estimatorForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const city = document.getElementById('city').value;
            const projectType = document.getElementById('project-type').value;
            const area = parseFloat(document.getElementById('area').value);
            const quality = document.getElementById('quality').value;

            if (!area || area <= 0 || city === "" || projectType === "" || quality === "") {
                resultDiv.innerHTML = "<p style='color: red;'>Kripya sabhi fields bharein.</p>";
                return;
            }

            // --- 1. Base Rate Definition (INR per Sq. Ft. for 'Other City' and 'New Home') ---
            let baseRate = 0; 
            if (quality === 'standard') baseRate = 1800; // Base: 1800/sq.ft.
            else if (quality === 'premium') baseRate = 2600; // Base: 2600/sq.ft.
            else if (quality === 'luxury') baseRate = 3800; // Base: 3800/sq.ft.

            // --- 2. Multipliers ---
            let cityMultiplier = 1.0;
            let typeAdjustment = 1.0;
            
            // City Multiplier
            if (city === 'mumbai' || city === 'bangalore') cityMultiplier = 1.25; // 25% higher cost
            else if (city === 'delhi') cityMultiplier = 1.15; // 15% higher cost
            
            // Project Type Adjustment
            if (projectType === 'office') typeAdjustment = 1.08; // 8% higher for commercial finish
            else if (projectType === 'renovation') typeAdjustment = 0.85; // 15% lower rate (assuming lesser structural work)

            // --- 3. Final Rate & Cost Calculation ---
            const finalRatePerSqFt = baseRate * cityMultiplier * typeAdjustment;
            const totalCost = area * finalRatePerSqFt;

            // --- 4. Cost Breakdown (for realistic feel) ---
            const breakdown = {
                // Approximate Industry Splits: Material (50%), Labour (30%), Overhead/Design/Profit (20%)
                material: totalCost * 0.50,
                labour: totalCost * 0.30,
                overhead: totalCost * 0.20 
            };
            
            // --- 5. Formatting & Display ---
            const formatCurrency = (amount) => amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 });
            
            resultDiv.style.textAlign = 'left';
            resultDiv.innerHTML = `
                <p style="color: var(--primary-color); font-size: 1.6em; margin-bottom: 15px; text-align: center;">
                    Total Estimated Cost: 
                    <span style="color: var(--secondary-color); display: block; font-weight: bold;">
                        ${formatCurrency(totalCost)}
                    </span>
                </p>
                
                <h4 style="color: var(--primary-color); margin-top: 10px; border-bottom: 1px solid #ccc; padding-bottom: 5px;">
                    Detailed Breakdown (Approx.)
                </h4>
                <ul style="list-style: none; padding: 0;">
                    <li style="display: flex; justify-content: space-between; padding: 5px 0;">
                        <span>🧱 Materials (Cement, Steel, etc.) (50%):</span>
                        <span style="font-weight: bold;">${formatCurrency(breakdown.material)}</span>
                    </li>
                    <li style="display: flex; justify-content: space-between; padding: 5px 0;">
                        <span>👷 Labour & Subcontracting (30%):</span>
                        <span style="font-weight: bold;">${formatCurrency(breakdown.labour)}</span>
                    </li>
                    <li style="display: flex; justify-content: space-between; padding: 5px 0;">
                        <span>📐 Overhead, Design & Profit (20%):</span>
                        <span style="font-weight: bold;">${formatCurrency(breakdown.overhead)}</span>
                    </li>
                </ul>
                
                <p style="font-size: 0.9em; font-weight: normal; color: #555; margin-top: 15px; text-align: center;">
                    *This estimate is based on approx. ${finalRatePerSqFt.toFixed(0)}/- per Sq. Ft. and includes all three components.
                </p>
            `;
        });
    }
});