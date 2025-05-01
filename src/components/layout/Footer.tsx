
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-serenity-50 border-t border-serenity-100">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center">
              <div className="rounded-full bg-serenity-500 w-8 h-8 flex items-center justify-center mr-2">
                <span className="text-white font-semibold text-sm">S</span>
              </div>
              <span className="font-bold text-xl text-serenity-700">Serenity</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Supporting your journey to mental wellness with tools, exercises, and resources.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/mood" className="text-sm text-muted-foreground hover:text-serenity-600">Mood Tracker</Link></li>
              <li><Link to="/mindfulness" className="text-sm text-muted-foreground hover:text-serenity-600">Mindfulness</Link></li>
              <li><Link to="/games" className="text-sm text-muted-foreground hover:text-serenity-600">Games</Link></li>
              <li><Link to="/resources" className="text-sm text-muted-foreground hover:text-serenity-600">Resources</Link></li>
              <li><Link to="/journal" className="text-sm text-muted-foreground hover:text-serenity-600">Journal</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-3">About Us</h4>
            <p className="text-sm text-muted-foreground mb-3">
              We're dedicated to making mental health support accessible to everyone.
            </p>
            <div className="text-sm text-muted-foreground">
              <p>If you're in crisis, please call:</p>
              <p className="font-medium text-serenity-700">988 Suicide & Crisis Lifeline</p>
              <p>(available 24/7)</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-serenity-100 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Serenity. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-serenity-600">Privacy Policy</Link>
            <Link to="/terms" className="text-xs text-muted-foreground hover:text-serenity-600">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
