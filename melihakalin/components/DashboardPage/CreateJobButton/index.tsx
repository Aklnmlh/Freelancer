'use client';
import { Button } from '@/components/ui/button';
import { User } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobSchema } from '@/helpers/ValidationSchemas/JobSchema';
import { categoriesList, jobTypes } from '@/data/constants';
import { fetcher } from '@/hooks/fetcher';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Check, Plus } from 'lucide-react';

const CreateJobButton = ({ user }: { user: User | null }) => {
  const router = useRouter();
  const { data, mutateAsync } = useMutation({
    mutationKey: ['createJob'],
    mutationFn: async (values: any) => {
      console.log(values);
      try {
        const result = await fetcher('/api/create/job', 'POST', values);
        return result;
      } catch (error) {
        throw new Error(error as string);
      }
    },
    onSuccess: (val) => {
      toast('İş Oluşturuldu Ödeme Ekranına Yönlendiriliyorsunuz.');
      router.push(`/dashboard/job/payment?id=${val.job.id}`);
    },
  });
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(jobSchema),
  });
  const [currentLength, setCurrentLength] = React.useState(1);
  const [selectedType, setSelectedType] = React.useState('Proje');
  const [taskDetails, setTaskDetails] = React.useState([
    { task: '', price: '' },
  ]);
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <span className="bg-primary p-3 hover:bg-opacity-30 transition-all duration-300 text-white rounded-md">
          İş Oluştur
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form
          onSubmit={handleSubmit(async (value) => {
            await mutateAsync(value);
          })}
        >
          <div className="flex flex-col gap-4">
            <label htmlFor="title">
              İş Başlığı
              <Input className="outline-none" {...register('title')} />
              {errors && errors.category ? (
                <p className="text-red-500 mt-2">Lütfen İş Başlığını girin</p>
              ) : (
                ''
              )}
            </label>
            <label htmlFor="description">
              İş Açıklaması
              <Input className="outline-none" {...register('description')} />
              {errors && errors.category ? (
                <p className="text-red-500 mt-2">Lütfen İş Açıklaması Girin</p>
              ) : (
                ''
              )}
            </label>
            <label htmlFor="price">
              İş Türü
              <Select
                onValueChange={(type) => {
                  reset();
                  setSelectedType(type);
                }}
                defaultValue="Proje"
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="İş Türü" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  {jobTypes.map((item) => {
                    return (
                      <SelectItem
                        className=""
                        key={item.id * 44}
                        value={item.title}
                      >
                        {item.title}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </label>
            {selectedType === 'Proje' ? (
              <label htmlFor="price">
                İş Bütçesi
                <Input
                  defaultValue={100}
                  min={100}
                  max={100000}
                  className="outline-none"
                  type="number"
                  {...register('price')}
                />
                {errors && errors.price ? (
                  <p className="text-red-500 mt-2">Lütfen Bütçe Belirtin</p>
                ) : (
                  ''
                )}
              </label>
            ) : (
              <>
                {Array(currentLength)
                  .fill(null)
                  .map((item, index) => (
                    <div className="flex flex-row gap-1" key={index * 88}>
                      <Input
                        {...register(`missions.${index}.task`)}
                        placeholder="Görev bilgisi"
                        value={taskDetails[index]?.task || ''}
                        onChange={(e) => {
                          const newTaskDetails = [...taskDetails];
                          newTaskDetails[index] = {
                            ...newTaskDetails[index],
                            task: e.target.value,
                          };
                          setTaskDetails(newTaskDetails);
                        }}
                      />
                      <Input
                        {...register(`missions.${index}.price`)}
                        placeholder="Bütçe"
                        type="number"
                        value={taskDetails[index]?.price || ''}
                        onChange={(e) => {
                          const newTaskDetails = [...taskDetails];
                          newTaskDetails[index] = {
                            ...newTaskDetails[index],
                            price: e.target.value,
                          };
                          setTaskDetails(newTaskDetails);
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          setCurrentLength((prev) => prev + 1);
                          setTaskDetails([
                            ...taskDetails,
                            { task: '', price: '' },
                          ]);
                        }}
                      >
                        <Plus />
                      </Button>
                    </div>
                  ))}
              </>
            )}
            <label className="w-full">
              <Controller
                control={control}
                name="category"
                rules={{
                  required: { message: 'Lütfen Kategori Seçin', value: true },
                }}
                render={({ field }) => {
                  return (
                    <Select onValueChange={field.onChange} {...field}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Kategori" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {categoriesList.map((item) => {
                          return (
                            <SelectItem
                              className=""
                              key={item.id * 44}
                              value={item.name}
                            >
                              {item.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  );
                }}
              />
              {errors && errors.category ? (
                <p className="text-red-500 mt-2">
                  Lütfen Kategori Seçimi Yapın
                </p>
              ) : (
                ''
              )}
            </label>
          </div>
          <AlertDialogFooter className="mt-[3svh]">
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <Button type="submit">Oluştur</Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateJobButton;
