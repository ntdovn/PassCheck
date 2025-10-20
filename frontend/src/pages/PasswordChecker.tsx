import { useState } from 'react';
import { Eye, EyeOff, Shield, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { passwordApi, PasswordAnalysis } from '../services/api';
import toast from 'react-hot-toast';

const PasswordChecker = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [analysis, setAnalysis] = useState<PasswordAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!password) {
      toast.error('Vui lòng nhập mật khẩu');
      return;
    }

    setLoading(true);
    try {
      const result = await passwordApi.checkStrength(password);
      setAnalysis(result);
      toast.success('Đã phân tích mật khẩu!');
    } catch (error) {
      toast.error('Không thể kiểm tra mật khẩu');
    } finally {
      setLoading(false);
    }
  };

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'very-weak':
        return 'text-red-600 bg-red-100';
      case 'weak':
        return 'text-orange-600 bg-orange-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'strong':
        return 'text-green-600 bg-green-100';
      case 'very-strong':
        return 'text-emerald-600 bg-emerald-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStrengthText = (strength: string) => {
    switch (strength) {
      case 'very-weak':
        return 'Rất yếu';
      case 'weak':
        return 'Yếu';
      case 'medium':
        return 'Trung bình';
      case 'strong':
        return 'Mạnh';
      case 'very-strong':
        return 'Rất mạnh';
      default:
        return 'Chưa đánh giá';
    }
  };

  const getStrengthWidth = (score: number) => {
    return `${(score / 4) * 100}%`;
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <div className="inline-block p-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl shadow-soft mb-4 animate-float">
          <Shield className="h-16 w-16 text-purple-600" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Kiểm tra độ mạnh mật khẩu
        </h1>
        <p className="text-gray-600">
          Đánh giá chi tiết về độ an toàn của mật khẩu 🔍
        </p>
      </div>

      {/* Input Section */}
      <div className="card-soft mb-8">
        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <span>Nhập mật khẩu cần kiểm tra</span>
          <span className="text-lg">✍️</span>
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCheck()}
            placeholder="Nhập mật khẩu của bạn..."
            className="input-field pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors p-2 rounded-xl hover:bg-purple-50"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        <button
          onClick={handleCheck}
          disabled={loading}
          className="btn-primary w-full mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '⏳ Đang kiểm tra...' : '🔍 Kiểm tra mật khẩu'}
        </button>
      </div>

      {/* Results Section */}
      {analysis && (
        <div className="space-y-6 animate-slide-up">
          {/* Strength Overview */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Kết quả đánh giá</h2>
              <span className={`px-4 py-2 rounded-full font-semibold ${getStrengthColor(analysis.strength)}`}>
                {getStrengthText(analysis.strength)}
              </span>
            </div>

            {/* Strength Bar */}
            <div className="mb-6">
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    analysis.score <= 1 ? 'bg-red-500' :
                    analysis.score === 2 ? 'bg-yellow-500' :
                    analysis.score === 3 ? 'bg-green-500' :
                    'bg-emerald-500'
                  }`}
                  style={{ width: getStrengthWidth(analysis.score) }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Rất yếu</span>
                <span>Yếu</span>
                <span>Trung bình</span>
                <span>Mạnh</span>
                <span>Rất mạnh</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-primary-600">{analysis.length}</div>
                <div className="text-sm text-gray-600">Độ dài</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-primary-600">{analysis.score}/4</div>
                <div className="text-sm text-gray-600">Điểm số</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-primary-600">{analysis.entropy}</div>
                <div className="text-sm text-gray-600">Entropy</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-primary-600">{analysis.characteristics.charDiversity}%</div>
                <div className="text-sm text-gray-600">Đa dạng</div>
              </div>
            </div>
          </div>

          {/* Characteristics */}
          <div className="card">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Đặc điểm mật khẩu</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                {analysis.characteristics.hasUpperCase ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-gray-400" />
                )}
                <span className={analysis.characteristics.hasUpperCase ? 'text-gray-900' : 'text-gray-500'}>
                  Có chữ in hoa
                </span>
              </div>
              <div className="flex items-center space-x-3">
                {analysis.characteristics.hasLowerCase ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-gray-400" />
                )}
                <span className={analysis.characteristics.hasLowerCase ? 'text-gray-900' : 'text-gray-500'}>
                  Có chữ thường
                </span>
              </div>
              <div className="flex items-center space-x-3">
                {analysis.characteristics.hasNumbers ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-gray-400" />
                )}
                <span className={analysis.characteristics.hasNumbers ? 'text-gray-900' : 'text-gray-500'}>
                  Có chữ số
                </span>
              </div>
              <div className="flex items-center space-x-3">
                {analysis.characteristics.hasSpecialChars ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-gray-400" />
                )}
                <span className={analysis.characteristics.hasSpecialChars ? 'text-gray-900' : 'text-gray-500'}>
                  Có ký tự đặc biệt
                </span>
              </div>
            </div>
          </div>

          {/* Crack Time Estimates */}
          <div className="card">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Thời gian crack ước tính</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Online (có giới hạn):</span>
                <span className="font-semibold text-gray-900">{analysis.crackTime.onlineThrottling}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Online (không giới hạn):</span>
                <span className="font-semibold text-gray-900">{analysis.crackTime.onlineNoThrottling}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Offline (slow hashing):</span>
                <span className="font-semibold text-gray-900">{analysis.crackTime.offlineSlowHashing}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Offline (fast hashing):</span>
                <span className="font-semibold text-gray-900">{analysis.crackTime.offlineFastHashing}</span>
              </div>
            </div>
          </div>

          {/* Feedback */}
          {(analysis.feedback.warning || analysis.feedback.suggestions.length > 0) && (
            <div className="card bg-yellow-50 border-yellow-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Đề xuất cải thiện</h3>
              {analysis.feedback.warning && (
                <div className="flex items-start space-x-3 mb-4 p-3 bg-yellow-100 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-yellow-900">{analysis.feedback.warning}</p>
                </div>
              )}
              {analysis.feedback.suggestions.length > 0 && (
                <ul className="space-y-2">
                  {analysis.feedback.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-yellow-600">•</span>
                      <span className="text-gray-700">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PasswordChecker;
