'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import toast from 'react-hot-toast'

export default function ProviderServicesPage() {
  const supabase = createClient()
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [providerId, setProviderId] = useState<string | null>(null)
  const [editingService, setEditingService] = useState<any | null>(null)
  const [form, setForm] = useState({
    name: '',
    description: '',
    duration: '',
    price: '',
  })

  const fetchServices = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data: provider } = await supabase
      .from('providers')
      .select('id')
      .eq('user_id', user.id)
      .maybeSingle()

    if (!provider) {
      toast.error('No provider profile found')
      return
    }

    setProviderId(provider.id)

    const { data } = await supabase
      .from('services')
      .select('*')
      .eq('provider_id', provider.id)

    setServices(data || [])
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!providerId) {
      toast.error('Provider profile not found!')
      setLoading(false)
      return
    }

    if (editingService) {
      // Update existing service
      const { error } = await supabase
        .from('services')
        .update({
          name: form.name,
          description: form.description,
          duration: parseInt(form.duration),
          price: parseFloat(form.price),
        })
        .eq('id', editingService.id)

      if (error) {
        toast.error(error.message)
      } else {
        toast.success('Service updated!')
        setShowForm(false)
        setEditingService(null)
        setForm({ name: '', description: '', duration: '', price: '' })
        fetchServices()
      }
    } else {
      // Add new service
      const { error } = await supabase
        .from('services')
        .insert({
          provider_id: providerId,
          name: form.name,
          description: form.description,
          duration: parseInt(form.duration),
          price: parseFloat(form.price),
        })

      if (error) {
        toast.error(error.message)
      } else {
        toast.success('Service added!')
        setShowForm(false)
        setForm({ name: '', description: '', duration: '', price: '' })
        fetchServices()
      }
    }

    setLoading(false)
  }

  const handleEdit = (service: any) => {
    setEditingService(service)
    setForm({
      name: service.name,
      description: service.description,
      duration: service.duration.toString(),
      price: service.price.toString(),
    })
    setShowForm(true)
  }

  const handleDelete = async (serviceId: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return

    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', serviceId)

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Service deleted!')
      fetchServices()
    }
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Services</h1>
            <p className="text-gray-500">Manage your offered services</p>
          </div>
          <Button onClick={() => {
            setShowForm(!showForm)
            setEditingService(null)
            setForm({ name: '', description: '', duration: '', price: '' })
          }}>
            {showForm ? 'Cancel' : '+ Add Service'}
          </Button>
        </div>

        {/* Add/Edit Service Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingService ? 'Edit Service' : 'New Service'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Service Name</Label>
                <Input
                  placeholder="e.g. Haircut, Massage"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  placeholder="Describe your service"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Duration (minutes)</Label>
                  <Input
                    type="number"
                    placeholder="e.g. 60"
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>Price ($)</Label>
                  <Input
                    type="number"
                    placeholder="e.g. 50"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    required
                  />
                </div>
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : editingService ? 'Update Service' : 'Add Service'}
              </Button>
            </form>
          </div>
        )}

        {/* Services List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.length > 0 ? services.map((service) => (
            <div key={service.id} className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold">{service.name}</h3>
              <p className="text-gray-500 text-sm mb-4">{service.description}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold">${service.price}</span>
                <span className="text-gray-500 text-sm">{service.duration} mins</span>
              </div>
              {/* Edit & Delete Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleEdit(service)}
                >
                  ✏️ Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-red-500 hover:text-red-700 hover:border-red-300"
                  onClick={() => handleDelete(service.id)}
                >
                  🗑️ Delete
                </Button>
              </div>
            </div>
          )) : (
            <p className="text-gray-500">No services yet. Add your first service!</p>
          )}
        </div>
      </div>
    </div>
  )
}