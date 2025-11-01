import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  portfolio: router({
    list: publicProcedure.query(async () => {
      const { getPortfolioProjects } = await import("./db");
      return getPortfolioProjects();
    }),
    create: protectedProcedure
      .input((val: unknown) => {
        if (typeof val !== "object" || val === null) throw new Error("Invalid input");
        const obj = val as Record<string, unknown>;
        return {
          title: String(obj.title || ""),
          description: obj.description ? String(obj.description) : undefined,
          category: String(obj.category || ""),
          imageUrl: obj.imageUrl ? String(obj.imageUrl) : undefined,
          projectUrl: obj.projectUrl ? String(obj.projectUrl) : undefined,
          technologies: obj.technologies ? String(obj.technologies) : undefined,
          order: typeof obj.order === "number" ? obj.order : 0,
        };
      })
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== "admin") throw new Error("Unauthorized");
        const { createPortfolioProject } = await import("./db");
        await createPortfolioProject(input);
        return { success: true };
      }),
    update: protectedProcedure
      .input((val: unknown) => {
        if (typeof val !== "object" || val === null) throw new Error("Invalid input");
        const obj = val as Record<string, unknown>;
        return {
          id: Number(obj.id || 0),
          title: obj.title ? String(obj.title) : undefined,
          description: obj.description ? String(obj.description) : undefined,
          category: obj.category ? String(obj.category) : undefined,
          imageUrl: obj.imageUrl ? String(obj.imageUrl) : undefined,
          projectUrl: obj.projectUrl ? String(obj.projectUrl) : undefined,
          technologies: obj.technologies ? String(obj.technologies) : undefined,
          order: typeof obj.order === "number" ? obj.order : undefined,
        };
      })
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== "admin") throw new Error("Unauthorized");
        const { updatePortfolioProject } = await import("./db");
        const { id, ...updates } = input;
        await updatePortfolioProject(id, updates);
        return { success: true };
      }),
    delete: protectedProcedure
      .input((val: unknown) => {
        if (typeof val !== "object" || val === null) throw new Error("Invalid input");
        return Number((val as Record<string, unknown>).id || 0);
      })
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== "admin") throw new Error("Unauthorized");
        const { deletePortfolioProject } = await import("./db");
        await deletePortfolioProject(input);
        return { success: true };
      }),
  }),

  testimonials: router({
    list: publicProcedure.query(async () => {
      const { getTestimonials } = await import("./db");
      return getTestimonials();
    }),
    create: protectedProcedure
      .input((val: unknown) => {
        if (typeof val !== "object" || val === null) throw new Error("Invalid input");
        const obj = val as Record<string, unknown>;
        return {
          clientName: String(obj.clientName || ""),
          clientRole: obj.clientRole ? String(obj.clientRole) : undefined,
          clientImage: obj.clientImage ? String(obj.clientImage) : undefined,
          content: String(obj.content || ""),
          rating: typeof obj.rating === "number" ? obj.rating : 5,
          order: typeof obj.order === "number" ? obj.order : 0,
        };
      })
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== "admin") throw new Error("Unauthorized");
        const { createTestimonial } = await import("./db");
        await createTestimonial(input);
        return { success: true };
      }),
    update: protectedProcedure
      .input((val: unknown) => {
        if (typeof val !== "object" || val === null) throw new Error("Invalid input");
        const obj = val as Record<string, unknown>;
        return {
          id: Number(obj.id || 0),
          clientName: obj.clientName ? String(obj.clientName) : undefined,
          clientRole: obj.clientRole ? String(obj.clientRole) : undefined,
          clientImage: obj.clientImage ? String(obj.clientImage) : undefined,
          content: obj.content ? String(obj.content) : undefined,
          rating: typeof obj.rating === "number" ? obj.rating : undefined,
          order: typeof obj.order === "number" ? obj.order : undefined,
        };
      })
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== "admin") throw new Error("Unauthorized");
        const { updateTestimonial } = await import("./db");
        const { id, ...updates } = input;
        await updateTestimonial(id, updates);
        return { success: true };
      }),
    delete: protectedProcedure
      .input((val: unknown) => {
        if (typeof val !== "object" || val === null) throw new Error("Invalid input");
        return Number((val as Record<string, unknown>).id || 0);
      })
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== "admin") throw new Error("Unauthorized");
        const { deleteTestimonial } = await import("./db");
        await deleteTestimonial(input);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
