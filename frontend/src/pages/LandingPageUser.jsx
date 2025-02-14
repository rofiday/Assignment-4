import TopNavigationBar from "../components/TopNavigationBar";

const LandingPageUser = () => {
  return (
    <>
      <TopNavigationBar />
      <div className="bg-gray-100">
        {/* Hero Section */}
        <section className="bg-blue-600 text-white py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold">
              Empowering Education with Technology
            </h1>
            <p className="mt-4 text-lg">
              Transforming the way people learn with cutting-edge digital
              solutions.
            </p>
            <button className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200">
              Get Started
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 text-center">
          <h2 className="text-4xl font-bold">Why Choose Us?</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-white shadow-lg rounded-lg">
                <feature.icon className="text-blue-600 w-12 h-12 mx-auto" />
                <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-gray-200 py-20 text-center">
          <h2 className="text-4xl font-bold">What Our Users Say</h2>
          <div className="mt-10 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 bg-white shadow-lg rounded-lg mb-6"
              >
                <p className="italic text-gray-600">{testimonial.quote}</p>
                <h4 className="mt-4 font-semibold">- {testimonial.name}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-blue-600 text-white py-16 text-center">
          <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mt-4 text-lg">
            Join us today and transform the way you learn.
          </p>
          <button className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200">
            Sign Up Now
          </button>
        </section>
      </div>
    </>
  );
};

const features = [
  {
    title: "Interactive Courses",
    description: "Engaging and interactive learning materials.",
    icon: () => (
      <svg
        className="w-12 h-12"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9 12h6M9 16h6M5 12h.01M5 16h.01M4 4h12a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z"></path>
      </svg>
    ),
  },
  {
    title: "Expert Instructors",
    description: "Learn from industry-leading professionals.",
    icon: () => (
      <svg
        className="w-12 h-12"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M13 7h.01M9 7h.01M9 11h.01M5 7h.01M5 11h.01M9 15h.01M5 15h.01M13 11h.01M13 15h.01M4 4h12a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z"></path>
      </svg>
    ),
  },
  {
    title: "Flexible Learning",
    description: "Study at your own pace, anytime, anywhere.",
    icon: () => (
      <svg
        className="w-12 h-12"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M4 4h12a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z"></path>
      </svg>
    ),
  },
];

const testimonials = [
  {
    quote: "This platform has completely changed the way I learn!",
    name: "Alice Johnson",
  },
  {
    quote: "I love the flexibility and the quality of courses offered here.",
    name: "Michael Smith",
  },
];

export default LandingPageUser;
