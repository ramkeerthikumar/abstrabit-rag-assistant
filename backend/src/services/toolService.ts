import supabase from "../config/supabase";

export async function executeTool(toolCall: any, workspaceId: string) {
  const { name, args } = toolCall;

  switch (name) {
    case "save_task": {
      const { title, description } = args;

      const { error } = await supabase.from("tasks").insert({
        workspace_id: workspaceId,
        title,
        description: description || null,
      });

      if (error) throw error;

      return `Task saved: ${title}`;
    }

    case "add_note": {
      const { content } = args;

      const { error } = await supabase.from("notes").insert({
        workspace_id: workspaceId,
        content,
      });

      if (error) throw error;

      return `Note saved successfully`;
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}