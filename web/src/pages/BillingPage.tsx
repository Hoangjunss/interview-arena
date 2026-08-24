import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { billingApi } from '../api/billing'
import { toast } from 'sonner'
import { CreditCard, Sparkles, CheckCircle2, AlertCircle, Calendar, ArrowRight, Loader2 } from 'lucide-react'
import type { UserSubscription } from '../types/billing'

export default function BillingPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [subscription, setSubscription] = useState<UserSubscription | null>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)

  const fetchSubscription = async () => {
    try {
      const response = await billingApi.getSubscription()
      setSubscription(response.data)
    } catch (error) {
      toast.error('Không thể lấy thông tin đăng ký gói.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubscription()

    // Handle toast messages from checkout redirection query parameters
    const checkoutStatus = searchParams.get('checkout')
    if (checkoutStatus === 'success') {
      toast.success('Thanh toán thành công! Gói của bạn sẽ được kích hoạt trong giây lát.')
      searchParams.delete('checkout')
      setSearchParams(searchParams)
    } else if (checkoutStatus === 'cancelled') {
      toast.error('Đã hủy giao dịch thanh toán.')
      searchParams.delete('checkout')
      setSearchParams(searchParams)
    }
  }, [searchParams])

  const handleUpgrade = async () => {
    setActionLoading(true)
    try {
      const response = await billingApi.createCheckoutSession()
      if (response.data?.url) {
        window.location.href = response.data.url
      } else {
        toast.error('Không nhận được liên kết thanh toán từ Stripe.')
      }
    } catch (error) {
      toast.error('Không thể tạo phiên thanh toán. Vui lòng thử lại.')
    } finally {
      setActionLoading(false)
    }
  }

  const handleCancel = async () => {
    if (!window.confirm('Bạn có chắc chắn muốn hủy gia hạn gói Pro? Bạn vẫn sẽ giữ đặc quyền Pro cho đến hết chu kỳ thanh toán hiện tại.')) {
      return
    }
    setActionLoading(true)
    try {
      await billingApi.cancel()
      toast.success('Đã hủy gia hạn thành công.')
      fetchSubscription()
    } catch (error) {
      toast.error('Không thể hủy gia hạn gói Pro.')
    } finally {
      setActionLoading(false)
    }
  }

  const handleResume = async () => {
    setActionLoading(true)
    try {
      await billingApi.resume()
      toast.success('Đã khôi phục gia hạn gói Pro thành công.')
      fetchSubscription()
    } catch (error) {
      toast.error('Không thể khôi phục gia hạn gói Pro.')
    } finally {
      setActionLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Đang tải thông tin gói dịch vụ...</p>
      </div>
    )
  }

  const isPro = subscription?.plan === 'PRO'
  const isCancelled = subscription?.cancelAtPeriodEnd

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
          Quản Lý Gói Dịch Vụ
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Nâng cấp tài khoản của bạn để tận hưởng các đặc quyền không giới hạn trên Interview Arena.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Plan Status Card */}
        <div className="bg-card/40 backdrop-blur-md border border-border shadow-xl rounded-2xl p-8 space-y-6 relative overflow-hidden transition-all duration-300 hover:shadow-primary/5">
          <div className="absolute top-0 right-0 p-4">
            <CreditCard className="h-6 w-6 text-muted-foreground/50" />
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">Gói Hiện Tại</h2>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-black">
                {isPro ? 'Pro Member' : 'Free Tier'}
              </span>
              {isPro && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary animate-pulse">
                  Active
                </span>
              )}
            </div>
          </div>

          <div className="border-t border-border/60 pt-6 space-y-4">
            {isPro ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>
                    {isCancelled 
                      ? `Gói sẽ kết thúc vào: ${new Date(subscription.currentPeriodEnd!).toLocaleDateString('vi-VN')}`
                      : `Gia hạn tiếp theo: ${new Date(subscription.currentPeriodEnd!).toLocaleDateString('vi-VN')}`
                    }
                  </span>
                </div>

                {isCancelled ? (
                  <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 rounded-xl p-4 flex items-start space-x-3 text-sm">
                    <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Đã đăng ký hủy gia hạn</p>
                      <p className="text-xs text-yellow-500/80 mt-1">
                        Tài khoản của bạn sẽ trở về gói Free vào ngày kết thúc chu kỳ. Bạn có thể khôi phục đăng ký bất cứ lúc nào trước hạn này.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-green-500/10 border border-green-500/20 text-green-500 rounded-xl p-4 flex items-start space-x-3 text-sm">
                    <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Tự động gia hạn đang hoạt động</p>
                      <p className="text-xs text-green-500/80 mt-1">
                        Gói Pro tự động gia hạn $5/tháng thông qua cổng thanh toán Stripe.
                      </p>
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  {isCancelled ? (
                    <button
                      onClick={handleResume}
                      disabled={actionLoading}
                      className="w-full bg-primary hover:bg-primary/95 text-primary-foreground font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      {actionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                      <span>Tiếp Tục Gia Hạn Gói Pro</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleCancel}
                      disabled={actionLoading}
                      className="w-full bg-destructive/10 hover:bg-destructive hover:text-destructive-foreground text-destructive border border-destructive/20 font-semibold py-3 px-6 rounded-xl transition-all duration-200"
                    >
                      {actionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Hủy Gia Hạn Gói'}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-muted/40 rounded-xl p-4 space-y-1">
                  <p className="text-xs text-muted-foreground">Chi phí</p>
                  <p className="text-2xl font-black text-foreground">$5<span className="text-sm font-normal text-muted-foreground"> / tháng</span></p>
                </div>

                <button
                  onClick={handleUpgrade}
                  disabled={actionLoading}
                  className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/95 hover:to-purple-600/95 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center space-x-2"
                >
                  {actionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                  <span>Nâng Cấp Lên Pro Ngay</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Benefits Card */}
        <div className="bg-card/40 backdrop-blur-md border border-border shadow-xl rounded-2xl p-8 space-y-6">
          <h2 className="text-xl font-bold flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span>Quyền Lợi Gói Pro</span>
          </h2>

          <ul className="space-y-4">
            {[
              { title: 'Phỏng Vấn AI Không Giới Hạn', desc: 'Luyện tập trả lời phỏng vấn giả lập 1-1 với AI không giới hạn số lượt mỗi ngày.' },
              { title: 'Luyện Thuật Toán (DSA) Không Giới Hạn', desc: 'Nộp bài và biên dịch tự động các bài toán giải thuật DSA không lo hết lượt.' },
              { title: 'Đầy Đủ 4 Ngôn Ngữ DSA', desc: 'Hỗ trợ thực thi và phản hồi trực tiếp các bài làm qua Python, JavaScript, Java, C++.' },
              { title: 'Hỗ Trợ Ưu Tiên', desc: 'Đường truyền ổn định, tài nguyên máy chủ biên dịch Judge0 được ưu tiên tốc độ cao nhất.' }
            ].map((benefit, i) => (
              <li key={i} className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm">{benefit.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{benefit.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
