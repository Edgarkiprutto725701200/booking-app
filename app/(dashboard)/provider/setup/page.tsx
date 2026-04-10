'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import toast from 'react-hot-toast'

export default function ProviderSetupPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    business_name: '',
    description: '',
    category: '',
    location: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      toast.error('Not authenticated')
      setLoading(false)
      return
    }

    const { error } = await supabase.from('providers').insert({
      user_id: user.id,
      business_name: form.business_name,
      description: form.description,
      category: form.category,
      location: form.location,
    })

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Provider profile created!')
      router.push('/provider')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Setup Your Provider Profile</CardTitle>
          <CardDescription>
            Tell customers about your business
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Business Name</Label>
              <Input
                placeholder="e.g. Joe's Barbershop"
                value={form.business_name}
                onChange={(e) => setForm({ ...form, business_name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Category</Label>
              <Input
                placeholder="e.g. Hair, Beauty, Health"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                placeholder="e.g. New York, NY"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                placeholder="Tell customers about your business"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Setting up...' : 'Create Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}