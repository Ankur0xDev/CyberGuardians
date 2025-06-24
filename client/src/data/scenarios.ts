import { Scenario } from '../types/game';

export const scenariosByLevel: Record<number, Scenario[]> = {
  1: [ // Phishing Detection
    {
      id: 'phish-1a',
      type: 'email',
      content: {
        subject: 'URGENT: Your account will be suspended!',
        sender: 'security@amaz0n.com',
        body: 'Your Amazon account has suspicious activity. Click here immediately to verify your account or it will be permanently suspended within 24 hours!'
      },
      options: [
        { id: 'click', text: 'Click the link to verify', isCorrect: false },
        { id: 'ignore', text: 'Ignore the email', isCorrect: false },
        { id: 'report', text: 'Report as phishing and delete', isCorrect: true },
        { id: 'forward', text: 'Forward to friends as warning', isCorrect: false }
      ],
      correctAnswer: 'report',
      explanation: 'This is a phishing email! Notice the misspelled domain (amaz0n.com) and urgent language. Always report and delete suspicious emails.',
      points: 100,
      characterThought: 'Hmm... this email looks suspicious. The domain name doesn\'t look right...'
    },
    {
      id: 'phish-1b',
      type: 'email',
      content: {
        subject: 'You\'ve won $1,000,000!',
        sender: 'lottery@officiallottery.net',
        body: 'Congratulations! You\'ve been selected in our international lottery. To claim your prize, please provide your bank details and pay the processing fee of $500.'
      },
      options: [
        { id: 'pay', text: 'Pay the processing fee', isCorrect: false },
        { id: 'ignore', text: 'Delete without opening attachments', isCorrect: true },
        { id: 'reply', text: 'Reply asking for more information', isCorrect: false },
        { id: 'click', text: 'Click links to verify legitimacy', isCorrect: false }
      ],
      correctAnswer: 'ignore',
      explanation: 'Classic lottery scam! You cannot win a lottery you never entered. Delete immediately and never pay upfront fees.',
      points: 100,
      characterThought: 'A million dollars? I never entered any lottery... this seems too good to be true.'
    },
    {
      id: 'phish-1c',
      type: 'website',
      content: {
        url: 'payp4l.com/login',
        siteName: 'PayPal Login'
      },
      options: [
        { id: 'login', text: 'Enter your PayPal credentials', isCorrect: false },
        { id: 'check', text: 'Check the URL carefully first', isCorrect: true },
        { id: 'bookmark', text: 'Bookmark this convenient link', isCorrect: false },
        { id: 'trust', text: 'Trust it since it looks official', isCorrect: false }
      ],
      correctAnswer: 'check',
      explanation: 'Always check URLs carefully! This is "payp4l.com" not "paypal.com". The "4" replaces the "a" - a common phishing technique.',
      points: 100,
      characterThought: 'Wait a minute... let me double-check this URL. Something doesn\'t look right.'
    },
    {
      id: 'phish-1d',
      type: 'email',
      content: {
        subject: 'Security Alert: Unusual Activity',
        sender: 'noreply@bankofamerica-security.com',
        body: 'We detected unusual activity on your account. Please verify your identity by clicking the link below and entering your login credentials.'
      },
      options: [
        { id: 'click', text: 'Click the link immediately', isCorrect: false },
        { id: 'call', text: 'Call the bank directly to verify', isCorrect: true },
        { id: 'reply', text: 'Reply with account information', isCorrect: false },
        { id: 'ignore', text: 'Ignore completely', isCorrect: false }
      ],
      correctAnswer: 'call',
      explanation: 'When in doubt, contact the organization directly using official contact information. Banks will never ask for credentials via email.',
      points: 100,
      characterThought: 'This looks urgent, but I should verify this through official channels first.'
    }
  ],
  2: [ // Password Security
    {
      id: 'pass-2a',
      type: 'message',
      content: {
        message: 'Which password is strongest for your banking account?'
      },
      options: [
        { id: 'simple', text: 'password123', isCorrect: false },
        { id: 'personal', text: 'MyName1990!', isCorrect: false },
        { id: 'complex', text: 'R@nd0m$tr0ng#Pa$$w0rd2024!', isCorrect: true },
        { id: 'memorable', text: 'ilovemydog', isCorrect: false }
      ],
      correctAnswer: 'complex',
      explanation: 'Strong passwords use a mix of uppercase, lowercase, numbers, and symbols. Avoid personal information and common patterns.',
      points: 100,
      characterThought: 'I need to choose a password that\'s both secure and follows best practices.'
    },
    {
      id: 'pass-2b',
      type: 'message',
      content: {
        message: 'Your friend asks to borrow your Netflix password. What do you do?'
      },
      options: [
        { id: 'share', text: 'Share it - they\'re trustworthy', isCorrect: false },
        { id: 'refuse', text: 'Politely decline and explain password security', isCorrect: true },
        { id: 'change', text: 'Give it but change it later', isCorrect: false },
        { id: 'write', text: 'Write it down for them', isCorrect: false }
      ],
      correctAnswer: 'refuse',
      explanation: 'Never share passwords, even with trusted friends. Each person should have their own accounts for security and accountability.',
      points: 100,
      characterThought: 'Even though I trust my friend, sharing passwords is never a good idea.'
    },
    {
      id: 'pass-2c',
      type: 'message',
      content: {
        message: 'You need to create a password for a new work account. What\'s the best approach?'
      },
      options: [
        { id: 'reuse', text: 'Use the same password as your personal email', isCorrect: false },
        { id: 'unique', text: 'Create a unique, complex password', isCorrect: true },
        { id: 'simple', text: 'Use something simple you won\'t forget', isCorrect: false },
        { id: 'birthday', text: 'Use your birthday with some symbols', isCorrect: false }
      ],
      correctAnswer: 'unique',
      explanation: 'Always use unique passwords for different accounts. If one account is compromised, others remain safe.',
      points: 100,
      characterThought: 'Each account should have its own unique password to prevent credential stuffing attacks.'
    }
  ],
  3: [ // Social Engineering
    {
      id: 'social-3a',
      type: 'message',
      content: {
        message: 'A caller claiming to be from your bank asks for your account number to "verify your identity" after a data breach.'
      },
      options: [
        { id: 'provide', text: 'Provide the information to help', isCorrect: false },
        { id: 'hangup', text: 'Hang up and call your bank directly', isCorrect: true },
        { id: 'partial', text: 'Give only partial information', isCorrect: false },
        { id: 'verify', text: 'Ask them to verify who they are first', isCorrect: false }
      ],
      correctAnswer: 'hangup',
      explanation: 'Banks never ask for account details over the phone. Hang up and call your bank using the official number to verify any issues.',
      points: 100,
      characterThought: 'This doesn\'t sound right. Banks don\'t usually call asking for account information.'
    },
    {
      id: 'social-3b',
      type: 'message',
      content: {
        message: 'You receive a text saying "Your package delivery failed. Click here to reschedule" but you haven\'t ordered anything.'
      },
      options: [
        { id: 'click', text: 'Click to see what package it is', isCorrect: false },
        { id: 'ignore', text: 'Ignore and delete the message', isCorrect: true },
        { id: 'reply', text: 'Reply asking for more details', isCorrect: false },
        { id: 'forward', text: 'Forward to family to ask if they ordered something', isCorrect: false }
      ],
      correctAnswer: 'ignore',
      explanation: 'This is a common scam text. If you haven\'t ordered anything, delete it. Legitimate delivery services don\'t send random texts.',
      points: 100,
      characterThought: 'I haven\'t ordered anything recently. This must be a scam trying to get me to click a malicious link.'
    }
  ],
  4: [ // Network Security
    {
      id: 'network-4a',
      type: 'message',
      content: {
        message: 'You\'re at a coffee shop and see these WiFi networks. Which is safest?'
      },
      options: [
        { id: 'free', text: 'Free_WiFi_Here', isCorrect: false },
        { id: 'coffee', text: 'CoffeeShop_Official', isCorrect: true },
        { id: 'unlocked', text: 'Unlocked network with strong signal', isCorrect: false },
        { id: 'hidden', text: 'Hidden network that requires password', isCorrect: false }
      ],
      correctAnswer: 'coffee',
      explanation: 'Always connect to official business networks. Ask staff for the correct network name and password. Avoid generic or unlocked networks.',
      points: 100,
      characterThought: 'I should ask the staff which network is theirs and get the official password.'
    }
  ],
  5: [ // Safe Downloads
    {
      id: 'download-5a',
      type: 'download',
      content: {
        filename: 'Free_Movie_Download.exe',
        message: 'You want to download a popular movie for free from a website offering "instant downloads".'
      },
      options: [
        { id: 'download', text: 'Download the .exe file', isCorrect: false },
        { id: 'scan', text: 'Download but scan with antivirus first', isCorrect: false },
        { id: 'avoid', text: 'Avoid illegal downloads entirely', isCorrect: true },
        { id: 'research', text: 'Research the website first', isCorrect: false }
      ],
      correctAnswer: 'avoid',
      explanation: 'Illegal download sites often contain malware. Use legitimate streaming services instead. Movie files should never be .exe files!',
      points: 100,
      characterThought: 'A movie file with a .exe extension? That\'s definitely malware. I should stick to legitimate streaming services.'
    }
  ],
  6: [ // Privacy Settings
    {
      id: 'privacy-6a',
      type: 'social',
      content: {
        platform: 'Instagram',
        message: 'You\'re posting vacation photos. What\'s the safest approach?'
      },
      options: [
        { id: 'live', text: 'Post in real-time with location tags', isCorrect: false },
        { id: 'after', text: 'Post after returning home', isCorrect: true },
        { id: 'private', text: 'Post to close friends only while traveling', isCorrect: false },
        { id: 'details', text: 'Post with detailed itinerary', isCorrect: false }
      ],
      correctAnswer: 'after',
      explanation: 'Never advertise that you\'re away from home in real-time. This tells criminals your house is empty. Post memories after you return.',
      points: 100,
      characterThought: 'I shouldn\'t advertise that I\'m away from home. Better to share these memories after I return.'
    }
  ],
  7: [ // Advanced Security
    {
      id: 'advanced-7a',
      type: 'message',
      content: {
        message: 'Your phone prompts you to install a software update. What do you do?'
      },
      options: [
        { id: 'ignore', text: 'Ignore it - updates cause problems', isCorrect: false },
        { id: 'delay', text: 'Install it but delay for a few weeks', isCorrect: false },
        { id: 'install', text: 'Install it promptly', isCorrect: true },
        { id: 'research', text: 'Research online if it\'s necessary', isCorrect: false }
      ],
      correctAnswer: 'install',
      explanation: 'Install security updates promptly! They patch vulnerabilities that criminals exploit. Delaying updates leaves you vulnerable.',
      points: 100,
      characterThought: 'Security updates are important for protecting against new threats. I should install this right away.'
    }
  ]
};