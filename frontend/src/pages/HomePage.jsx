import React, { useState } from 'react';
import { Building2, Mail, Phone, MapPin, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';

const HomePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock submission - will be replaced with actual API call
    setTimeout(() => {
      toast.success('Thank you! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const divisions = [
    {
      name: 'Access Signs',
      description: 'Leading custom commercial signage company offering tailored in-house signage solutions for businesses nationwide.',
      url: 'https://accessigns.com',
      features: ['Custom Signage', 'Expert Installation', 'North America Service'],
      logo: '/access-signs-logo.png',
      hasLogo: true
    },
    {
      name: 'Suntek Awnings',
      description: 'Premium awning solutions providing shade, protection, and enhanced aesthetics for commercial and residential properties.',
      url: 'https://suntekawnings.com',
      features: ['Custom Awnings', 'Quality Materials', 'Professional Service'],
      logo: '/suntek-awnings-logo.png',
      hasLogo: true
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Building2 className="w-8 h-8 text-orange-600" />
            <h1 className="text-2xl font-bold text-gray-900">Access Group</h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#divisions" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">Divisions</a>
            <a href="#about" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">About</a>
            <a href="#contact" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Excellence in Signage
            <span className="block text-orange-600 mt-2">& Awning Solutions</span>
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Access Group brings together industry-leading divisions to serve your commercial signage and awning needs across North America.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => document.getElementById('divisions').scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Our Divisions
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-gray-300 hover:border-orange-600 text-gray-900 hover:text-orange-600 px-8 py-6 text-lg font-semibold transition-all duration-300"
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </section>

      {/* Divisions Section */}
      <section id="divisions" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Our Divisions</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Two specialized companies working together to deliver exceptional results for your business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {divisions.map((division, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-2xl transition-all duration-500 border-2 border-gray-200 hover:border-orange-600 overflow-hidden"
              >
                <CardContent className="p-8">
                  <div className="bg-gray-100 rounded-lg p-6 mb-6 flex items-center justify-center h-32 group-hover:bg-orange-50 transition-colors duration-300">
                    {division.hasLogo ? (
                      <img 
                        src={division.logo} 
                        alt={`${division.name} Logo`}
                        className="max-h-24 max-w-full object-contain"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-gray-400 group-hover:text-orange-600 transition-colors duration-300">
                        {division.name} Logo
                      </span>
                    )}
                  </div>
                  
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">{division.name}</h4>
                  <p className="text-gray-600 mb-6 leading-relaxed">{division.description}</p>
                  
                  <div className="space-y-3 mb-8">
                    {division.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-6 text-lg transition-all duration-300 group-hover:shadow-lg"
                    onClick={() => window.open(division.url, '_blank')}
                  >
                    Visit {division.name}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-gray-900 mb-6">About Access Group</h3>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Access Group is a trusted leader in commercial signage and awning solutions. With decades of combined experience, 
            our divisions deliver exceptional craftsmanship, innovative designs, and unparalleled service across North America.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="p-6">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-orange-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Trusted Expertise</h4>
              <p className="text-gray-600">Decades of experience in commercial solutions</p>
            </div>
            <div className="p-6">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-orange-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Quality Guaranteed</h4>
              <p className="text-gray-600">Premium materials and expert craftsmanship</p>
            </div>
            <div className="p-6">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-orange-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">North America Service</h4>
              <p className="text-gray-600">Serving clients across the continent</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h3>
            <p className="text-lg text-gray-600">
              Have a question or ready to start your project? We'd love to hear from you.
            </p>
          </div>
          
          <Card className="shadow-xl border-2 border-gray-200">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-gray-900 font-semibold mb-2 block">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="h-12 border-gray-300 focus:border-orange-600 focus:ring-orange-600"
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email" className="text-gray-900 font-semibold mb-2 block">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="h-12 border-gray-300 focus:border-orange-600 focus:ring-orange-600"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-gray-900 font-semibold mb-2 block">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="h-12 border-gray-300 focus:border-orange-600 focus:ring-orange-600"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-gray-900 font-semibold mb-2 block">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="border-gray-300 focus:border-orange-600 focus:ring-orange-600 resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-6 text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Building2 className="w-6 h-6 text-orange-600" />
                <h4 className="text-xl font-bold">Access Group</h4>
              </div>
              <p className="text-gray-400">
                Excellence in signage and awning solutions across North America.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Our Divisions</h4>
              <ul className="space-y-2">
                <li>
                  <a href="https://accessigns.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-600 transition-colors">
                    Access Signs
                  </a>
                </li>
                <li>
                  <a href="https://suntekawnings.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-600 transition-colors">
                    Suntek Awnings
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>info@grpaccess.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>(555) 123-4567</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Access Group. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;