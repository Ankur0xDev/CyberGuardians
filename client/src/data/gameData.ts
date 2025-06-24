import type { Badge, Level } from '../types/game';

export const badges: Badge[] = [
  {
    id: 'survivor',
    name: 'Survivor',
    description: 'Complete your first 3 levels',
    icon: 'Shield',
    color: '#00FF88',
    requirement: 3
  },
  {
    id: 'warrior',
    name: 'Warrior',
    description: 'Complete 5 levels with high scores',
    icon: 'Sword',
    color: '#00D4FF',
    requirement: 5
  },
  {
    id: 'king',
    name: 'King',
    description: 'Master all cybersecurity levels',
    icon: 'Crown',
    color: '#8B5FFF',
    requirement: 7
  }
];

export const levels: Omit<Level, 'scenarios'>[] = [
  {
    id: 1,
    title: 'Phishing Detection',
    description: 'Learn to identify malicious emails and links',
    icon: 'Mail',
    color: '#FF4444',
    isUnlocked: true,
    isCompleted: false,
    bestScore: 0,
    sceneType: 'office',
    introDialogue: [
      "Welcome to your first day at CyberCorp! I'm here to help you learn about cybersecurity.",
      "Today we'll start with phishing detection - one of the most common cyber threats.",
      "Phishing emails try to trick you into giving away personal information or clicking malicious links.",
      "Let's practice identifying these threats together!"
    ],
    completionDialogue: [
      "Excellent work! You've successfully identified the phishing attempts.",
      "Remember: always check sender addresses carefully and be suspicious of urgent requests.",
      "You're well on your way to becoming a cybersecurity expert!"
    ]
  },
  {
    id: 2,
    title: 'Password Security',
    description: 'Master strong password creation and management',
    icon: 'Lock',
    color: '#44FF44',
    isUnlocked: false,
    isCompleted: false,
    bestScore: 0,
    sceneType: 'terminal',
    introDialogue: [
      "Time to learn about password security - your first line of defense!",
      "Weak passwords are like leaving your front door wide open.",
      "We'll practice creating strong passwords and recognizing weak ones.",
      "Ready to secure your digital life?"
    ],
    completionDialogue: [
      "Great job! You now understand what makes a password strong.",
      "Remember: use unique passwords for every account and enable 2FA when possible.",
      "Your accounts are now much safer!"
    ]
  },
  {
    id: 3,
    title: 'Social Engineering',
    description: 'Recognize manipulation tactics and scams',
    icon: 'Users',
    color: '#FF8844',
    isUnlocked: false,
    isCompleted: false,
    bestScore: 0,
    sceneType: 'home',
    introDialogue: [
      "Social engineering is when criminals manipulate people to reveal information.",
      "They might pretend to be from your bank, a tech company, or even a friend.",
      "The key is to always verify requests through official channels.",
      "Let's practice spotting these manipulation tactics!"
    ],
    completionDialogue: [
      "Excellent! You've learned to spot social engineering attempts.",
      "Trust your instincts - if something feels wrong, it probably is.",
      "Always verify suspicious requests independently!"
    ]
  },
  {
    id: 4,
    title: 'Network Security',
    description: 'Navigate public WiFi and secure connections',
    icon: 'Wifi',
    color: '#4488FF',
    isUnlocked: false,
    isCompleted: false,
    bestScore: 0,
    sceneType: 'cafe',
    introDialogue: [
      "Public WiFi can be convenient, but it's also dangerous if not used carefully.",
      "Hackers can intercept your data on unsecured networks.",
      "We'll learn how to stay safe when connecting to public networks.",
      "Let's explore network security together!"
    ],
    completionDialogue: [
      "Well done! You now know how to use public WiFi safely.",
      "Remember: avoid sensitive activities on public networks and use VPNs when possible.",
      "Your data is now much more secure!"
    ]
  },
  {
    id: 5,
    title: 'Safe Downloads',
    description: 'Identify trusted software and avoid malware',
    icon: 'Download',
    color: '#FF44FF',
    isUnlocked: false,
    isCompleted: false,
    bestScore: 0,
    sceneType: 'lab',
    introDialogue: [
      "Downloading files from the internet can be risky if you're not careful.",
      "Malware often disguises itself as legitimate software or media files.",
      "We'll learn how to identify safe download sources and avoid malicious files.",
      "Ready to become a download detective?"
    ],
    completionDialogue: [
      "Fantastic! You can now identify safe and unsafe downloads.",
      "Always download from official sources and scan files with antivirus software.",
      "Your computer is now much safer from malware!"
    ]
  },
  {
    id: 6,
    title: 'Privacy Settings',
    description: 'Control your digital footprint on social media',
    icon: 'Settings',
    color: '#44FFFF',
    isUnlocked: false,
    isCompleted: false,
    bestScore: 0,
    sceneType: 'home',
    introDialogue: [
      "Your privacy settings control who can see your personal information online.",
      "Many people share too much information without realizing the risks.",
      "We'll learn how to protect your privacy on social media and other platforms.",
      "Let's take control of your digital footprint!"
    ],
    completionDialogue: [
      "Excellent work! You now know how to protect your privacy online.",
      "Remember: regularly review your privacy settings and think before you post.",
      "Your personal information is now much more secure!"
    ]
  },
  {
    id: 7,
    title: 'Advanced Security',
    description: 'Master 2FA, VPNs, and security updates',
    icon: 'Shield',
    color: '#8B5FFF',
    isUnlocked: false,
    isCompleted: false,
    bestScore: 0,
    sceneType: 'control-center',
    introDialogue: [
      "Welcome to advanced cybersecurity! You've come so far.",
      "Now we'll master the most powerful security tools: 2FA, VPNs, and security updates.",
      "These tools will make you nearly invulnerable to most cyber attacks.",
      "Ready to become a true CyberGuardian?"
    ],
    completionDialogue: [
      "Incredible! You've mastered advanced cybersecurity techniques.",
      "You're now equipped with the knowledge to protect yourself and others.",
      "Congratulations on becoming a true CyberGuardian!"
    ]
  }
];

export const securityTips = [
  {
    category: 'Phishing',
    tips: [
      'Always check the sender\'s email address carefully',
      'Hover over links to see the actual destination',
      'Be suspicious of urgent or threatening language',
      'Never enter credentials on pages accessed via email links'
    ]
  },
  {
    category: 'Passwords',
    tips: [
      'Use unique passwords for every account',
      'Enable two-factor authentication when available',
      'Consider using a password manager',
      'Make passwords at least 12 characters long'
    ]
  },
  {
    category: 'Social Engineering',
    tips: [
      'Verify requests through official channels',
      'Never give personal information over the phone',
      'Be skeptical of unexpected prizes or offers',
      'Trust your instincts if something feels wrong'
    ]
  },
  {
    category: 'Network Security',
    tips: [
      'Avoid sensitive activities on public WiFi',
      'Use a VPN when connecting to untrusted networks',
      'Look for HTTPS on websites handling sensitive data',
      'Keep your devices\' software updated'
    ]
  }
];