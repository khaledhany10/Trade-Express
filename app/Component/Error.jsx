// app/Component/Error.jsx
import React, { useState, useEffect } from 'react';

function Error() {
  const [error, setError] = useState({
    code: 500,
    name: 'Internal Server Error',
    message: '',
    timestamp: '',
    requestId: '',
    path: '',
    method: ''
  });
  
  const [showDetails, setShowDetails] = useState(false);
  const [errors, setErrors] = useState([]);
  const [countdown, setCountdown] = useState(60);

  // أشهر أخطاء HTTP في المواقع
  const httpErrors = [
    {
      code: 400,
      name: 'Bad Request',
      description: 'The server could not understand the request due to invalid syntax.',
      solution: 'Check your request parameters and try again.'
    },
    {
      code: 401,
      name: 'Unauthorized',
      description: 'You need to log in to access this resource.',
      solution: 'Please log in and try again.'
    },
    {
      code: 403,
      name: 'Forbidden',
      description: "You don't have permission to access this resource.",
      solution: 'Contact your administrator if you need access.'
    },
    {
      code: 404,
      name: 'Not Found',
      description: 'The requested resource could not be found on this server.',
      solution: 'Check the URL and try again.'
    },
    {
      code: 408,
      name: 'Request Timeout',
      description: 'The server timed out waiting for the request.',
      solution: 'Please try again later.'
    },
    {
      code: 429,
      name: 'Too Many Requests',
      description: 'You have sent too many requests in a given amount of time.',
      solution: 'Please wait a moment before trying again.'
    },
    {
      code: 500,
      name: 'Internal Server Error',
      description: 'The server encountered an unexpected condition.',
      solution: 'Our team has been notified. Please try again later.'
    },
    {
      code: 502,
      name: 'Bad Gateway',
      description: 'The server received an invalid response from the upstream server.',
      solution: 'This is usually temporary. Please refresh the page.'
    },
    {
      code: 503,
      name: 'Service Unavailable',
      description: 'The server is temporarily unable to handle the request.',
      solution: 'Please try again in a few minutes.'
    },
    {
      code: 504,
      name: 'Gateway Timeout',
      description: 'The server did not receive a timely response from the upstream server.',
      solution: 'Please refresh the page or try again later.'
    }
  ];

  // مشاكل شائعة في قواعد البيانات
  const databaseErrors = [
    'Connection refused',
    'Too many connections',
    'Deadlock detected',
    'Timeout expired',
    'Database is locked',
    'Duplicate entry',
    'Foreign key constraint fails'
  ];

  // مشاكل API شائعة
  const apiErrors = [
    'API rate limit exceeded',
    'Invalid API key',
    'CORS policy violation',
    'Request entity too large',
    'Unsupported media type',
    'Method not allowed'
  ];

  // مشاكل السيرفر
  const serverErrors = [
    'Out of memory',
    'CPU overload',
    'Disk full',
    'Process crashed',
    'Port already in use',
    'SSL handshake failed'
  ];

  // مشاكل الشبكة
  const networkErrors = [
    'DNS lookup failed',
    'Connection reset',
    'Network timeout',
    'Unable to reach server',
    'TLS handshake error'
  ];

  // مشاكل المصادقة
  const authErrors = [
    'Session expired',
    'Invalid token',
    'CSRF token mismatch',
    'OAuth provider error'
  ];

  useEffect(() => {
    // اختيار خطأ عشوائي
    const randomError = httpErrors[Math.floor(Math.random() * httpErrors.length)];
    
    // إنشاء Request ID فريد
    const requestId = 'req_' + Math.random().toString(36).substring(2, 15) + 
                      Math.random().toString(36).substring(2, 15);
    
    // مسارات عشوائية
    const paths = [
      '/api/users',
      '/dashboard',
      '/auth/login',
      '/api/data',
      '/checkout',
      '/profile/settings',
      '/search',
      '/api/products',
      '/admin',
      '/download'
    ];
    
    // ميثود HTTP عشوائية
    const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
    
    // اختيار رسالة خطأ إضافية من الفئات المختلفة
    const allErrors = [
      ...databaseErrors,
      ...apiErrors,
      ...serverErrors,
      ...networkErrors,
      ...authErrors
    ];
    
    const extraError = allErrors[Math.floor(Math.random() * allErrors.length)];
    
    setError({
      ...randomError,
      message: `${randomError.description} (${extraError})`,
      timestamp: new Date().toISOString(),
      requestId: requestId,
      path: paths[Math.floor(Math.random() * paths.length)],
      method: methods[Math.floor(Math.random() * methods.length)],
      ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      userAgent: navigator.userAgent,
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
      extraError: extraError
    });

    // إنشاء قائمة بالأخطاء السابقة
    const pastErrors = [];
    for (let i = 0; i < 5; i++) {
      const pastError = httpErrors[Math.floor(Math.random() * httpErrors.length)];
      pastErrors.push({
        code: pastError.code,
        name: pastError.name,
        time: new Date(Date.now() - (i + 1) * 60000).toLocaleTimeString()
      });
    }
    setErrors(pastErrors);

    // عداد تنازلي
    const timer = setInterval(() => {
      setCountdown(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // نسخ معلومات الخطأ
  const copyErrorDetails = () => {
    const errorText = `
Error Details:
-------------
Code: ${error.code}
Type: ${error.name}
Message: ${error.message}
Time: ${error.timestamp}
Request ID: ${error.requestId}
Path: ${error.method} ${error.path}
IP: ${error.ip}
User Agent: ${error.userAgent}
    `;
    
    navigator.clipboard.writeText(errorText);
    alert('✅ Error details copied to clipboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* بطاقة الخطأ الرئيسية */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* شريط علوي بسيط */}
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex items-center gap-2">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          </div>

          {/* المحتوى */}
          <div className="p-8">
            {/* أيقونات ورمز الخطأ */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="text-7xl font-bold text-gray-800 mb-2">
                  {error.code}
                </div>
                <div className="text-xl font-medium text-gray-600 mb-1">
                  {error.name}
                </div>
                <div className="text-sm text-gray-400 font-mono">
                  {error.method} {error.path}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-400 font-mono">
                  {error.time}
                </div>
                <div className="text-xs text-gray-400 font-mono">
                  {error.date}
                </div>
                <div className="mt-2 text-xs bg-red-50 text-red-600 px-2 py-1 rounded">
                  Request ID: {error.requestId?.substring(0, 8)}
                </div>
              </div>
            </div>

            {/* رسالة الخطأ */}
            <div className="mb-6">
              <div className="text-sm text-gray-600 leading-relaxed border-l-2 border-red-200 pl-4">
                {error.message || error.description}
              </div>
            </div>

            {/* تفاصيل إضافية (تظهر عند الضغط) */}
            <div className="mb-6">
              <button 
                onClick={() => setShowDetails(!showDetails)}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1"
              >
                <span>{showDetails ? '▼' : '▶'}</span>
                <span>{showDetails ? 'Hide details' : 'Show details'}</span>
              </button>
              
              {showDetails && (
                <div className="mt-3 p-3 bg-gray-50 rounded text-xs font-mono text-gray-500 space-y-1">
                  <div>Request URL: {window.location.href}</div>
                  <div>Request Method: {error.method}</div>
                  <div>Status Code: {error.code}</div>
                  <div>Time: {error.timestamp}</div>
                  <div>IP Address: {error.ip}</div>
                  <div>User Agent: {error.userAgent?.substring(0, 50)}...</div>
                  <div>Accept: application/json, text/plain, */*</div>
                  <div>Content-Type: application/json</div>
                </div>
              )}
            </div>

            {/* عداد إعادة المحاولة */}
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-400 transition-all duration-1000"
                    style={{ width: `${(countdown / 60) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-400">
                  Retry in {countdown}s
                </span>
              </div>
            </div>

            {/* الحل المقترح */}
            <div className="mb-6 p-4 bg-blue-50 rounded border border-blue-100">
              <h3 className="text-xs font-semibold text-blue-700 uppercase mb-1">
                Suggested Action
              </h3>
              <p className="text-sm text-blue-600">
                {error.solution || 'Please try again later. Our team has been notified.'}
              </p>
            </div>

            {/* أخطاء سابقة */}
            {errors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">
                  Recent Errors
                </h3>
                <div className="space-y-1">
                  {errors.map((e, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <span className="text-gray-300">{e.time}</span>
                      <span className="text-gray-400">-</span>
                      <span className="text-gray-500">{e.code}</span>
                      <span className="text-gray-400">{e.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* معلومات إضافية بسيطة */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400 font-mono">
            {error.code} {error.name} • {error.requestId} • {new Date().getFullYear()}
          </p>
          <p className="text-xs text-gray-300 mt-1">
            If this problem persists, please contact support with the Request ID above.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Error;