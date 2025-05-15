import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, Search, FileText, Users, Lock, 
  ArrowRight, Rocket, ShieldCheck, Smartphone, 
  BarChart2, Headphones 
} from 'lucide-react';
import Header from '../navbar/header';

const Home = () => {
  return (
    <>
    <Header />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Hero Section */}
        <section aria-label="Hero section" className="flex flex-col-reverse md:flex-row items-center justify-between py-16 md:py-24 gap-12 md:gap-24">
          <div className="max-w-xl text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-gray-900">
              Job Connect
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-600">
              Your full-stack job portal connecting talent with opportunity seamlessly.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row sm:justify-start justify-center gap-4">
              <Link to="/search" className="inline-block px-8 py-3 rounded-md bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition">
                Find Jobs
              </Link>
              <Link to="/post-job" className="inline-block px-8 py-3 rounded-md border border-blue-600 text-blue-600 font-semibold text-lg hover:bg-blue-50 transition">
                Post a Job
              </Link>
            </div>
          </div>
          <div className="w-full max-w-lg">
            <img alt="Modern flat style illustration showing diverse people searching and posting jobs on a digital platform" className="w-full h-auto rounded-lg shadow-lg" height="400" loading="lazy" src="https://storage.googleapis.com/a1aa/image/c82b95d9-2ec3-4ed1-05ac-a9f3597d7f50.jpg" width="600"/>
          </div>
        </section>

        {/* About the Platform */}
        <section aria-label="About the platform" className="py-16 border-t border-gray-200">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              About Job Connect
            </h2>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Job Connect is a comprehensive job portal designed to bridge the gap between job seekers and employers. Whether you're looking for your dream job or the perfect candidate, our platform offers a seamless, efficient, and secure experience.
            </p>
          </div>
        </section>

        {/* Key Features */}
        <section aria-label="Key features" className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Key Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
              {/* Feature 1: Easy job posting */}
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
                <Briefcase className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Easy Job Posting
                </h3>
                <p className="text-gray-600">
                  Post jobs quickly with an intuitive interface designed for employers of all sizes.
                </p>
              </div>
              {/* Feature 2: Smart job search & filters */}
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
                <Search className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Smart Job Search &amp; Filters
                </h3>
                <p className="text-gray-600">
                  Find the perfect job with advanced filters and AI-powered search capabilities.
                </p>
              </div>
              {/* Feature 3: Resume upload & tracking */}
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
                <FileText className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Resume Upload &amp; Tracking
                </h3>
                <p className="text-gray-600">
                  Upload your resume and track your applications all in one place.
                </p>
              </div>
              {/* Feature 4: Role-based access */}
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
                <Users className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Role-Based Access
                </h3>
                <p className="text-gray-600">
                  Tailored experiences for job seekers and employers with secure role management.
                </p>
              </div>
              {/* Feature 5: Secure authentication */}
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
                <Lock className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Secure Authentication
                </h3>
                <p className="text-gray-600">
                  Your data is protected with industry-standard security and authentication protocols.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section aria-label="How it works" className="py-16 border-t border-gray-200">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">
              How It Works
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-12">
              {/* Step 1 */}
              <div className="max-w-xs flex flex-col items-center text-center">
                <img alt="Flat style illustration of a person signing up on a digital platform" className="mb-6 w-36 h-36" height="150" loading="lazy" src="https://storage.googleapis.com/a1aa/image/87d69eb9-aa93-485b-bc07-14eec91c599b.jpg" width="150"/>
                <h3 className="text-xl font-semibold mb-2">
                  Step 1: Sign Up
                </h3>
                <p className="text-gray-600">
                  Create your free account to get started on your job journey.
                </p>
              </div>
              {/* Arrow */}
              <div className="hidden md:block text-blue-600">
                <ArrowRight className="w-12 h-12" />
              </div>
              {/* Step 2 */}
              <div className="max-w-xs flex flex-col items-center text-center">
                <img alt="Flat style illustration showing a person posting a job and another searching jobs on a laptop" className="mb-6 w-36 h-36" height="150" loading="lazy" src="https://storage.googleapis.com/a1aa/image/fd047fc3-d58b-4c2e-6894-728f81a20bd4.jpg" width="150"/>
                <h3 className="text-xl font-semibold mb-2">
                  Step 2: Post or Search Jobs
                </h3>
                <p className="text-gray-600">
                  Employers post jobs, and seekers find the best matches with ease.
                </p>
              </div>
              {/* Arrow */}
              <div className="hidden md:block text-blue-600">
                <ArrowRight className="w-12 h-12" />
              </div>
              {/* Step 3 */}
              <div className="max-w-xs flex flex-col items-center text-center">
                <img alt="Flat style illustration of a happy person getting hired and an employer hiring a candidate" className="mb-6 w-36 h-36" height="150" loading="lazy" src="https://storage.googleapis.com/a1aa/image/d0ec3203-729e-4cd6-f3cb-76ba97b1270c.jpg" width="150"/>
                <h3 className="text-xl font-semibold mb-2">
                  Step 3: Get Hired or Hire
                </h3>
                <p className="text-gray-600">
                  Connect, interview, and secure your next opportunity or candidate.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Job Connect */}
        <section aria-label="Why choose Job Connect" className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">
              Why Choose Job Connect?
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left max-w-4xl mx-auto">
              <li className="flex items-start gap-4">
                <Rocket className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">
                    Fast Hiring Process
                  </h3>
                  <p className="text-gray-600">
                    Streamlined workflows to reduce time-to-hire and get you working sooner.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <ShieldCheck className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">
                    Verified Employers
                  </h3>
                  <p className="text-gray-600">
                    We ensure all employers are verified to maintain a trustworthy environment.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Smartphone className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">
                    Responsive Design
                  </h3>
                  <p className="text-gray-600">
                    Access Job Connect on any device, anytime, anywhere.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Users className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">
                    Community Support
                  </h3>
                  <p className="text-gray-600">
                    Join a growing community of professionals and employers.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <BarChart2 className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">
                    Insightful Analytics
                  </h3>
                  <p className="text-gray-600">
                    Track your job applications or postings with detailed analytics.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Headphones className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">
                    Dedicated Support
                  </h3>
                  <p className="text-gray-600">
                    Our support team is here to help you every step of the way.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Testimonials */}
        <section aria-label="Testimonials" className="py-16 border-t border-gray-200">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Testimonial 1 */}
              <div className="bg-white p-8 rounded-lg shadow-md flex flex-col justify-between">
                <p className="text-gray-700 mb-6 italic">
                  "Job Connect made my job search effortless. The smart filters helped me find the perfect role in no time!"
                </p>
                <div className="flex items-center gap-4">
                  <img alt="Portrait of a smiling young woman with short brown hair, representing a job seeker named Jane Smith" className="w-16 h-16 rounded-full object-cover" height="64" loading="lazy" src="https://storage.googleapis.com/a1aa/image/c42d06b5-4610-46f5-588d-956e8844cd81.jpg" width="64"/>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">
                      Jane Smith
                    </p>
                    <p className="text-sm text-gray-500">
                      Job Seeker
                    </p>
                  </div>
                </div>
              </div>
              {/* Testimonial 2 */}
              <div className="bg-white p-8 rounded-lg shadow-md flex flex-col justify-between">
                <p className="text-gray-700 mb-6 italic">
                  "As an employer, posting jobs and managing applicants has never been easier. Highly recommend Job Connect!"
                </p>
                <div className="flex items-center gap-4">
                  <img alt="Portrait of a middle-aged man with glasses and beard, representing an employer named Michael Williams" className="w-16 h-16 rounded-full object-cover" height="64" loading="lazy" src="https://storage.googleapis.com/a1aa/image/a6f9f5c4-7845-4a4c-17d1-f0d3fa3045d8.jpg" width="64"/>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">
                      Michael Williams
                    </p>
                    <p className="text-sm text-gray-500">
                      Employer
                    </p>
                  </div>
                </div>
              </div>
              {/* Testimonial 3 */}
              <div className="bg-white p-8 rounded-lg shadow-md flex flex-col justify-between">
                <p className="text-gray-700 mb-6 italic">
                  "The platform’s secure authentication and role-based access gave me peace of mind while managing my job applications."
                </p>
                <div className="flex items-center gap-4">
                  <img alt="Portrait of a young woman with long black hair and glasses, representing a job seeker named Alice Lee" className="w-16 h-16 rounded-full object-cover" height="64" loading="lazy" src="https://storage.googleapis.com/a1aa/image/f4f2ecbc-494d-408b-724e-32dd89a118bf.jpg" width="64"/>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">
                      Alice Lee
                    </p>
                    <p className="text-sm text-gray-500">
                      Job Seeker
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section aria-label="Call to action" className="py-16 bg-blue-600 rounded-lg mt-16 mb-24 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white mb-6">
            Ready to take the next step?
          </h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Join thousands of job seekers and employers who trust Job Connect to find the perfect match.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/signup" className="inline-block px-10 py-4 rounded-md bg-white text-blue-600 font-semibold text-lg hover:bg-gray-100 transition">
              Sign Up
            </Link>
            <Link to="/login" className="inline-block px-10 py-4 rounded-md border border-white text-white font-semibold text-lg hover:bg-white hover:text-blue-600 transition">
              Login
            </Link>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-300 py-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Job Connect. All rights reserved.
          </p>
          {/* <nav className="flex flex-wrap gap-6 text-gray-600 text-sm font-medium">
            <Link to="/about" className="hover:text-blue-600 transition">About</Link>
            <Link to="/contact" className="hover:text-blue-600 transition">Contact</Link>
            <Link to="/terms" className="hover:text-blue-600 transition">Terms</Link>
            <Link to="/privacy" className="hover:text-blue-600 transition">Privacy Policy</Link>
          </nav> */}
        </div>
      </footer>
    </>
  );
};

export default Home;
